var m = require('mraa');

var initCompass = function() {
    var instance = new m.I2c(0);
    instance.address(0x1e);

    var b = new Buffer(2);

    b[0] = 0x00;
    b[1] = 0x70;
    instance.write(b);

    b[0] = 0x01;
    b[1] = 0xA0;
    instance.write(b);

    b[0] = 0x02;
    b[1]= 0x00;
    instance.write(b);

    return instance;
}

var readCompass = function(i) {
    var b = i.read(6);

    for(var c = 0; c < 5; c++)
        i.read(6);

    var x = ((((b[0] << 8) | b[1]) << 16) >> 16),
        y = ((((b[2] << 8) | b[3]) << 16) >> 16),
        z = ((((b[4] << 8) | b[5]) << 16) >> 16);

    console.log("Compass data: " + [x,y,z].join(","));
    return b;
}