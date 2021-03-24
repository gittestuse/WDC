(function() {

      var myConnector = tableau.makeConnector();

      // Define the schema
      //  myConnector.getSchema = function(schemaCallback){}

        myConnector.getSchema = function(schemaCallback) {
          var recordsInfo = [];
          $.ajax({
            url: JSON.parse(tableau.connectionData)['url'],
            type: "POST",
            data: {
              token: JSON.parse(tableau.connectionData)['token'],
              content: 'exportFieldNames',
              format: 'json',
              returnFormat: 'json',
              type: 'flat',
              rawOrLabelHeaders: 'raw',
              exportCheckboxLabel: 'true',
              exportSurveyFields: 'true',
              exportDataAccessGroups: 'true'
              },
            contentType: "application/x-www-form-urlencoded",
            dataType: "json",
            success: function(resp){
                recordsInfo = resp;
                var recordSchema = [];
                recordsInfo.forEach(function(field){
                  recordSchema.push({
                    id: field.export_field_name,
                    alias: field.original_field_name,
                    dataType: tableau.dataTypeEnum.string
                  });
                });
                var redcapTable = {
                  id: "redcap",
                  alias: "custom redcap extract",
                  columns: recordSchema
                }
                schemaCallback([redcapTable]);
              }
            });
         };


      // Download the data
      myConnector.getData = function(table, doneCallback) {

        var tableData = [];
          $.ajax({
            url: JSON.parse(tableau.connectionData)['url'],
            type: "POST",
            data: {
              token: JSON.parse(tableau.connectionData)['token'],
              content: 'record',
              format: 'json',
              returnFormat: 'json',
              type: 'flat',
              rawOrLabelHeaders: 'raw',
              exportCheckboxLabel: 'true',
              exportSurveyFields: 'true',
              exportDataAccessGroups: 'true'
            },
            contentType: "application/x-www-form-urlencoded",
            dataType: "json",
            success: function(resp){
            resp.forEach(function(record){
              tableData.push(record);
            });
            table.appendRows(tableData);
            doneCallback();
          }
        });
        }

      tableau.registerConnector(myConnector);

      $(document).ready(function (){
        $("#submitButton").click(function() {
            tableau.connectionData = JSON.stringify({
              'token': $("#token").val(),
              'url': $("#url").val()
            });
            tableau.connectionName = "Get Data";
            tableau.submit();
        });
      });

  })();