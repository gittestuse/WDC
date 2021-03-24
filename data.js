(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "firstName",
            alias: "firstName",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "id",
            alias: "id",
            dataType: tableau.dataTypeEnum.int
        },{
            id: "requestType",
            alias: "requestType",
            dataType: tableau.dataTypeEnum.string
        } ,{
            id: "clientName",
            alias: "clientName",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "legalName",
            alias: "legalName",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "status",
            alias: "status",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "requestNote",
            alias: "requestNote",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "safeId",
            alias: "safeId",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "dateCreated",
            alias: "dateCreated",
            dataType: tableau.dataTypeEnum.date
        },
        {
            id: "dateQueued",
            alias: "dateQueued",
            dataType: tableau.dataTypeEnum.date
        },
        {
            id: "registeredCountry",
            alias: "registeredCountry",
            dataType: tableau.dataTypeEnum.string
        }
        ];

        var tableSchema = {
            id: "Main",
            alias: "Main",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {

     /*   $.ajaxSetup({
         headers : {
            'x-rapidapi-host' : 'api-nba-v1.p.rapidapi.com',
            'x-rapidapi-key' : 'd18cdeb3a2mshab6824adf713c9ep130fb2jsncca2d444588d'
          } 
        }); */

        $.getJSON("http://pp.a206032-oem-backend.edp-content-preprod.aws-int.thomsonreuters.com/api/ai/rest/v1/search/requests?pageSize=1000000", function(resp) {
            var feat = resp.raw_data,//countryVal = "India",
              var   tableData = [];
            
            // Iterate over the JSON object
             for (var j = 0, len = 1000; j < len; j++) { 
                

               
                    tableData.push({
                    
                        "content" : feat[j].firstName,
                        "id": feat[j].id,
                        "requestType":feat[j].requestType,
                        "clientName":feat[j].clientName,
                        "legalName": feat[j].legalName,
                        "status": feat[j].status,
                        "requestNote":feat[j].requestNote,
                        "safeId": safeId,
                        "dateCreated": feat[j].dateCreated,
                        "dateQueued": feat[j].dateQueued,
                        "registeredCountry":feat[j].registeredCountry
                        
                    });        


                       

                
            } 
            
                    
            
            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "Dataset"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();