module.exports = {
    /**
     * Handles errors and returns a JSON
     * @param  Koa Context ctx
     * @return N/A
     */
    errorResponse: function(ctx){
         //this.response.set('Content-Type', 'application/json');
         ctx.body = {
            message: ctx.response.message,
            errorcode: ctx.response.status
        }

    }
}
