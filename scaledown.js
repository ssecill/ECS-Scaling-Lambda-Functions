console.log('Loading event');
var aws = require('aws-sdk');

exports.handler = function(event, contex, callback) {
    //var ecsService = 'service';
    var ecsRegion = 'eu-west-1';
    var ecsCluster = 'secil'

    var ecsService = ['service', 'secill'];
    for (var i = 0; i < ecsService.length; i++) {
        console.log(ecsService[i]);
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
                    var params = {
                        cluster: ecsCluster,
                        service: ecsService[i],
                        desiredCount: 1
                    };
                    ecs.updateService(params, function(err, data) {
                        if (err) {
                            console.log(err, err.stack);
                        } else {
                            console.log(data);
                        }
                    });
                }

            }

        });
    }


};
