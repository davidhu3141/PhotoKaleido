function render_rotate_180(e) {

    var pathd = [
        [handles[0].x(), handles[0].y()],
        [handles[1].x(), handles[1].y()],
        [handles[2].x(), handles[2].y()]];
    path.plot(pathd);
    pathIndicator.plot(pathd);

    for (var t = 0; t < 102; t++) {
        var i = parseInt(Math.floor(t / 10))
        var j = t % 10;
        var tx = (pathd[1][0] - pathd[0][0]) * (i - 4) + (pathd[2][0] - pathd[0][0]) * (j - 4);
        var ty = (pathd[1][1] - pathd[0][1]) * (i - 4) + (pathd[2][1] - pathd[0][1]) * (j - 4);
        useList[i * 10 + j]
            .attr({ transform: `matrix(1,0,0,1,${tx},${ty})` })
        useList[i * 10 + j + 102]
            .untransform()
            .transform({
                ox: (pathd[1][0] + pathd[2][0]) / 2,
                oy: (pathd[1][1] + pathd[2][1]) / 2,
                rotate: 180,
                translateX: tx,
                translateY: ty,
            })

    }
}