function render_rotate_120(e) {

    var dux = handles[1].x() - handles[0].x();
    var duy = handles[1].y() - handles[0].y();

    var pathd = [
        [handles[0].x(), handles[0].y()],
        [handles[1].x(), handles[1].y()],
        [handles[0].x() + dux / 2 - duy * sin60, handles[0].y() + duy / 2 + dux * sin60],
        [handles[0].x() - dux / 2 - duy * sin60, handles[0].y() - duy / 2 + dux * sin60]];
    var cx = (pathd[0][0] + pathd[1][0] + pathd[2][0] + pathd[3][0]) / 4;
    var cy = (pathd[0][1] + pathd[1][1] + pathd[2][1] + pathd[3][1]) / 4;
    var pathd2 = pathd.map(e => [e[0] + Math.sign(e[0] - cx), e[1] + Math.sign(e[1] - cy)])
    path.plot(pathd2);
    pathIndicator.plot(pathd);

    var dvx = pathd[2][0] - pathd[0][0]
    var dvy = pathd[2][1] - pathd[0][1]

    for (var t = 0; t < 68; t++) {
        var i = ~~(t / 8);
        var j = t % 8;
        for (var k = 0; k < 3; k++) {
            useList[i * 8 + j + k * 68]
                .untransform()
                .transform({
                    ox: pathd[0][0],
                    oy: pathd[0][1],
                    rotate: 120 * k,
                    translateX: (dux * 2 - dvx) * (i - 3) + (dux + dvx) * (j - 3),
                    translateY: (duy * 2 - dvy) * (i - 3) + (duy + dvy) * (j - 3)
                })

        }
    }
}