console.log('Loading event');
var aws = require('aws-sdk');
exports.handler = function (event, contex, callback) {
    var ecsService = [''];
    var ecsService1 = ['service', 'secill'];
    var ecsService2 = ['myservice2'];
    var ecsCluster = ['secil', 'secil2'];
    var ecsRegion = 'eu-west-1';
    var maxCount = 4;

    for (var i = 0; i < ecsCluster.length; i++) {
        console.log('SSS->', ecsCluster[i])
        if (ecsCluster[i] == 'secil') {
            ecsService = ecsService1;
        }
        else {
            ecsService = ecsService2;
        }
        for (var m = 0; m < ecsService.length; m++) {
            /*console.log('ecsService:' ,ecsService);
            console.log('ecsCluster: '+ecsCluster[i]);
            console.log('ecsService: '+[ecsService[m]]);*/
            console.log('---------');
            var ecs = new aws.ECS({ region: ecsRegion });
            ecs.describeServices({ services: [ecsService[m]], cluster: ecsCluster[i] }, function (err, data) {
                if (err) {
                    console.log(err, err.stack);
                } else {
                    var desiredCount = data.services[0].desiredCount;
                    console.log(desiredCount);
                    if (desiredCount < maxCount) {
                        var params = {
                            cluster: ecsCluster[i],
                            service: ecsService[m],
                            desiredCount: maxCount
                        };
                        ecs.updateService(params, function (err, data) {
                            if (err) {
                                console.log(err, err.stack);
                            } else {
                                console.log(data);
                            }
                        });
                        //console.log(params);
                    }
                    else {
                        console.log('mevcutta maximum countta, guncellenmedi!');
                    }
                }
            });
        }
    }
}
