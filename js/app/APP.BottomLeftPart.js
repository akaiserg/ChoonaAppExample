/**
 *
 * Bottom left module
 */
APP.BottomLeftPart =choona.extendModule(APP.Core, {

    /**
     *    to initialize the module
     */
	start: function(){

        var self = this;
        self.subscribes();

	},

    /**
     *  subscriptions to another modules
     */
    subscribes:function(){
        var self=this;
        self.sb.subscribe('TopPart_dataSearch', function(data){
            self.setData(data);

        });
    },

    /**
     * To show the panel
     */
    showPanel: function(){

        $( '#leftBottom_id' ).removeClass('hide');

    },


    /**
     * Setting the data sent for the service
     * @param data
     */
    setData: function(data){

        var self= this;
        self.showPanel();
        console.info(data);
        $.each(data.data.networks, function(i, item) {
            //console.info(item);
            self.addRow(i,item);
        });

    },


    /**
     * Adding  rows to the table of the module
     * @param position
     * @param item
     */
    addRow:function(position,item){

        var self= this;
        $('#tab_list_id tr:last').after('<tr>' +
            '<td>' +(position+1)+'</td> ' +
            '<td>'+item.location.city+'</td> ' +
            '<td>'+item.name+'</td>' +
            '<td>'+item.location.country+'</td>' +
            '<td>'+item.company+'</td>' +
            '<td><a id="td_'+position+'_id">Info</a></td>' +
            ' </tr>');
        $( '#td_'+position+'_id' ).click(function() {
            self.sb.publish('BottomLeftPart_clickInfo', {
                'url':item.href
            });
        });

    },

    /**
     *    to finish the module
     */
    end: function(){
    }


});
