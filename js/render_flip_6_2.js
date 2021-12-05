function render_flip_6_2(e) {

    var dux = handles[1].x() - handles[0].x();
    var duy = handles[1].y() - handles[0].y();

    var pathd = [
        [handles[0].x(), handles[0].y()],
        [handles[1].x(), handles[1].y()],
        [handles[0].x() - dux / 2 - duy * sin60, handles[0].y() - duy / 2 + dux * sin60]];
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

    var ox = (pathd[1][0] + pathd[2][0]) / 2;
    var oy = (pathd[1][1] + pathd[2][1]) / 2;
    var ix = pathd[0][0];
    var iy = pathd[0][1];
    var twotheta = Math.PI - 2 * Math.atan2(pathd[2][0] - pathd[1][0], pathd[2][1] - pathd[1][1]);
    var cp = Math.cos(twotheta);
    var sp = Math.sin(twotheta);
    var cb = [0, 1, 2].map(e => Math.cos(e * 2 * Math.PI / 3));
    var sb = [0, 1, 2].map(e => Math.sin(e * 2 * Math.PI / 3));
    var transformer = [0, 1, 2].map(t => {
        return {
            a: cb[t] * cp - sb[t] * sp,
            c: cp * sb[t] + cb[t] * sp,
            e: - cb[t] * (ix - ox) - (cb[t] * cp - sb[t] * sp) * ox - (cp * sb[t] + cb[t] * sp) * oy + (iy - oy) * sb[t] + ix,
            b: cp * sb[t] + cb[t] * sp,
            d: - cb[t] * cp + sb[t] * sp,
            f: - cb[t] * (iy - oy) - (cp * sb[t] + cb[t] * sp) * ox + (cb[t] * cp - sb[t] * sp) * oy - (ix - ox) * sb[t] + iy,
        }
    })

    for (var t = 0; t < 34; t++) {
        var i = ~~(t / 6);
        var j = t % 6;
        var tx = (dux * 2 + dvx) * (i - 2) + (-dux + dvx) * (j - 2);
        var ty = (duy * 2 + dvy) * (i - 2) + (-duy + dvy) * (j - 2);
        for (var k = 0; k < 3; k++) {
            useList[i * 6 + j + k * 34]
                .untransform()
                .transform({
                    ox: pathd[0][0],
                    oy: pathd[0][1],
                    rotate: 120 * k,
                    translateX: tx,
                    translateY: ty,
                });

        }
        for (var k = 3; k < 6; k++) {
            var _t = { ...transformer[k - 3] };
            useList[i * 6 + j + k * 34]
                .attr({ transform: `matrix(${_t.a},${_t.b},${_t.c},${_t.d},${_t.e + tx},${_t.f + ty})` })
        }
    }
}