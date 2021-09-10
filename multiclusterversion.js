console.log('Loading event');
var aws = require('aws-sdk');

exports.handler = function(event, contex, callback) {
    var ecsService = ['service', 'secill'];
    var ecsRegion = 'eu-west-1';
    var ecsCluster = ['secil','cluster2'];
    var maxCount = 3;

    for (var i = 0; i < ecsService.length; i++) {
        var ecs = new aws.ECS({
            region: ecsRegion
        });
        ecs.describeServices({
            services: [ecsService[i]],
            cluster: ecsCluster
        }, function(err, data) {
            if (err) {
                console.log(err, err.stack);
            } else {
                var desiredCount = data.services[0].desiredCount;
                console.log(desiredCount);
                for (var i = 0; i < ecsService.length; i++) {
                    if (desiredCount < maxCount) {
                        desiredCount++;
                        var params = {
                            cluster: ecsCluster,
                            service: ecsService[i],
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
            }
        });
    }
};
