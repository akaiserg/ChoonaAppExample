/**
 *
 * Bottom right module
 */
APP.BottomRightPart =choona.extendModule(APP.Core, {

    /**
     * url sent from other module
     */
    urlName:null,

    /**
     *    to initialize the module
     */
	start: function(){

        var self = this;
        self.subscribes();

	},


    subscribes:function(){

        var self=this;
        self.sb.subscribe('BottomLeftPart_clickInfo', function(url){
            //console.info(url);
            self.urlName=url.url;
            self.init();
        });
        self.sb.subscribe('appDomain_to_rightBottom', function(data){
            //console.info(data);
            self.setData(data);
        });

    },

    /**
     * To show the panel
     */
    showPanel: function(){

        $( '#rightBottom_id' ).removeClass('hide');

    },

    /**
     * Events for this module
     */
    init: function(){

        var self= this;
        self.sb.publish('BottomRightPart_appDomain', {
            'url':'http://api.citybik.es/'+self.urlName
        });

    },

    /**
     * Setting data sent  from the service
     */
    setData: function(data){

        var self= this;
        self.showPanel();
        //console.info(data.data.network.location);
        $( '#city_info_id' ).html(data.data.network.location.city);
        $( '#country_info_id' ).html(data.data.network.location.country);
        $( '#lat_info_id' ).html(data.data.network.location.latitude);
        $( '#lon_info_id' ).html(data.data.network.location.longitude);

    },

    /**
     *    to finish the module
     */
    end: function(){
    }

});