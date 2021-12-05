function render_flip_12(e) {

    var dux = handles[1].x() - handles[0].x();
    var duy = handles[1].y() - handles[0].y();

    var pathd = [
        [handles[0].x(), handles[0].y()],
        [handles[1].x(), handles[1].y()],
        [handles[0].x() + dux - duy / 2 / sin60, handles[0].y() + duy + dux / 2 / sin60]];
    var cx = (pathd[0][0] + pathd[1][0] + pathd[2][0]) / 3;
    var cy = (pathd[0][1] + pathd[1][1] + pathd[2][1]) / 3;
    var pathd2 = pathd.map(e => {
        var ux = (e[0] - cx) / Math.sqrt((e[0] - cx) * (e[0] - cx) + (e[1] - cy) * (e[1] - cy));
        var uy = (e[1] - cy) / Math.sqrt((e[0] - cx) * (e[0] - cx) + (e[1] - cy) * (e[1] - cy));
        return [e[0] + 1.5 * ux, e[1] + 1.5 * uy]
    })
    path.plot(pathd2);
    pathIndicator.plot(pathd);

    var dvx = pathd[2][0] - pathd[0][0]
    var dvy = pathd[2][1] - pathd[0][1]

    var ix = pathd[0][0];
    var iy = pathd[0][1];
    var twotheta = 2 * Math.atan2(dvy, dvx);
    var cp = Math.cos(twotheta);
    var sp = Math.sin(twotheta);
    var cb = [0, 1, 2, 3, 4, 5].map(e => Math.cos(e * Math.PI / 3));
    var sb = [0, 1, 2, 3, 4, 5].map(e => Math.sin(e * Math.PI / 3));
    var transformer = [0, 1, 2, 3, 4, 5].map(t => {
        return {
            a: cb[t] * cp - sb[t] * sp,
            c: cp * sb[t] + cb[t] * sp,
            e: - (cb[t] * cp - sb[t] * sp) * ix - (cp * sb[t] + cb[t] * sp) * iy + ix,
            b: cp * sb[t] + cb[t] * sp,
            d: - cb[t] * cp + sb[t] * sp,
            f: - (cp * sb[t] + cb[t] * sp) * ix + (cb[t] * cp - sb[t] * sp) * iy + iy,
        }
    })

    for (var t = 0; t < 17; t++) {
        var i = ~~(t / 4);
        var j = t % 4;
        var tx = -(dux * 4 - 3 * dvx) * (i - 1) + (-2 * dux + 3 * dvx) * (j - 1);
        var ty = -(duy * 4 - 3 * dvy) * (i - 1) + (-2 * duy + 3 * dvy) * (j - 1);
        for (var k = 0; k < 6; k++) {
            useList[i * 4 + j + k * 17]
                .untransform()
                .transform({
                    ox: pathd[0][0],
                    oy: pathd[0][1],
                    rotate: 60 * k,
                    translateX: tx,
                    translateY: ty,
                });

        }
        for (var k = 6; k < 12; k++) {
            var _t = { ...transformer[k - 6] };
            useList[i * 4 + j + k * 17]
                .attr({ transform: `matrix(${_t.a},${_t.b},${_t.c},${_t.d},${_t.e + tx},${_t.f + ty})` })
        }
    }
}