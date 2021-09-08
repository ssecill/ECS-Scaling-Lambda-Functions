console.log('Loading event');
var aws = require('aws-sdk');

exports.handler = function(event, contex, callback) {
    var ecsService = 'service';
    var ecsRegion = 'eu-west-1';
    var ecsCluster = 'secil'
    var maxCount = 3;

    var ecs = new aws.ECS({
        region: ecsRegion
    });
    ecs.describeServices({
        services: [ecsService],
        cluster: ecsCluster
    }, function(err, data) {
        if (err) {
            console.log(err, err.stack);
        } else {
            var desiredCount = data.services[0].desiredCount;
            console.log(desiredCount);
            if (desiredCount < maxCount) {
                desiredCount++;
                var params = {
                    cluster: ecsCluster,
                    service: ecsService,
                    desiredCount: maxCount
                };
                ecs.updateService(params, function(err, data) {
                    if (err) {
                        console.log(err, err.stack);
                    } else {
                        console.log(data);
                    }
                });
            } else {
                console.log('mevcutta maximum countta, guncellenmedi!');
            }
        }

    });
};
