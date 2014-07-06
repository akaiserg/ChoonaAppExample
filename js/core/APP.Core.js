
choona.util.debug = true;
/**
 * APP CORE
 *
 */
var APP={};
/**
 * general utilities  for all modules
 */
APP.Core = (function () {

    return {
        /**
         *  Block  container by id
         * @param pId: id of the container
         */
        blockId: function(pId){
            $('#'+pId).block({
                message: '<img src="img/busy.gif" />',
                css: { border: '3px solid #a00' }
            });
        },

        /**
         *  Unblock  container by id
         * @param pId: id of the container
         */
        unBlockId: function(pId){
            $('#'+pId).unblock();
        }

    };
})();