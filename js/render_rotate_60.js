function render_rotate_60(e) {

    var dux = handles[1].x() - handles[0].x();
    var duy = handles[1].y() - handles[0].y();

    var pathd = [
        [handles[0].x(), handles[0].y()],
        [handles[1].x(), handles[1].y()],
        [handles[0].x() + dux / 2 - duy * sin60, handles[0].y() + duy / 2 + dux * sin60]];
    var cx = (pathd[0][0] + pathd[1][0] + pathd[2][0]) / 3;
    var cy = (pathd[0][1] + pathd[1][1] + pathd[2][1]) / 3;
    var pathd2 = pathd.map(e => [e[0] + Math.sign(e[0] - cx), e[1] + Math.sign(e[1] - cy)])
    path.plot(pathd2);
    pathIndicator.plot(pathd);

    var dvx = pathd[2][0] - pathd[0][0]
    var dvy = pathd[2][1] - pathd[0][1]

    for (var t = 0; t < 34; t++) {
        var i = ~~(t / 6);
        var j = t % 6;
        for (var k = 0; k < 6; k++) {
            useList[i * 6 + j + k * 34]
                .untransform()
                .transform({
                    ox: pathd[0][0],
                    oy: pathd[0][1],
                    rotate: 60 * k,
                    translateX: (dux * 2 - dvx) * (i - 3) + (dux + dvx) * (j - 3),
                    translateY: (duy * 2 - dvy) * (i - 3) + (duy + dvy) * (j - 3),
                });

        }
    }
}