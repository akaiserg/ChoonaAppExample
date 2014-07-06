/**
 * Main module of the Application
 * @type {*}
 */
APP.Main=choona.extendModule(APP.Core, {
    // without template inside of the module
    /*template: '<div class="container" id="top_id"></div>' */
    /**
     *    to initialize the module
     */
	start:  function(){

        var self= this;
		self.sb.startModule({
			id:'top_id',
			module: APP.TopPart,
            config:self.config
		});
		self.sb.startModule({
			id:'leftBottom_id',
			module: APP.BottomLeftPart,
            config:self.config
		});
        self.sb.startModule({
            id:'rightBottom_id',
            module: APP.BottomRightPart,
            config:self.config
        });
        self.appInitSubscribe();

    },

    /**
     *    to finish the module
     */
	end:  function(){
	
	},

    /**
     * Subscribe to modules that get info from some service
     */
    appInitSubscribe:function(){

        var self=this;
        self.sb.subscribe('TopPart_appDomain', function(data){
            console.info(data.url);
            self.getDataService('top_id',data.url);
        });
        self.sb.subscribe('BottomRightPart_appDomain', function(data){
            self.getDataService('rightBottom_id',data.url);
        });

    },


    /**
     * Get the information from  the services that modules use
     */
    getDataService: function(id,url){

        var self= this;
        $.ajax({
            url: url,
            async: true,
            type: "GET",

            beforeSend: function(){
                // method defined inside of APP.Core
                self.blockId(id);
            },
            complete: function(){
                // method defined inside of APP.Core
                self.unBlockId(id);
            },
            success: function (oJsonData) {
                console.info(oJsonData);
                switch(id){
                    case 'top_id':
                        self.sb.publish('appDomain_to_TopPart', {
                            'data':oJsonData
                        });
                    break;
                    case 'rightBottom_id':
                        self.sb.publish('appDomain_to_rightBottom', {
                            'data':oJsonData
                        });
                    break;
                }
            },
            error: function(){
            }
        });

    }

});
