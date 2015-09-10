function CalendarController($scope){function getStandardTime(date){return{raw:date,year:date.getFullYear(),monthName:getMonthName(date.getMonth()),month:date.getMonth(),day:getDayName(date),date:date.getDate(),time:date.getTime()}}function getTimeObjectIfDate(date){return angular.isDate(new Date(date))?getStandardTime(new Date(date)):!1}function setConfigOptions(){$scope.config=$scope.config||{},$scope.config.start=getTimeObjectIfDate($scope.config.start),$scope.config.end=getTimeObjectIfDate($scope.config.end),options=angular.extend({},defaults,$scope.config)}function dayIsOutOfRange(_date){var hasRange=options.start&&options.end;return hasRange&&(_date.time<options.start.time||_date.time>options.end.time)?!0:options.start&&_date.time<options.start.time?!0:options.end&&_date.time>options.end.time?!0:void 0}function setSelectedDate(date){$scope.selected=getStandardTime(date),$scope.ngModel=$scope.selected.raw}function setCurrentMonthAndYear(month,year){var date=new Date(void 0!==year?year:$scope.selected.year,void 0!==month?month:$scope.selected.month,1);$scope.current=getStandardTime(date)}function getMonthName(month){return $scope.months[month]}function getDayName(date){return $scope.days[date.getDay()]}function initialize(){setConfigOptions(),setSelectedDate($scope.ngModel||new Date),setCurrentMonthAndYear(),$scope.updateDateMap()}var options={},defaults={},universal={DAY:864e5,HOUR:36e5};$scope.days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],$scope.months=["January","February","March","April","May","June","July","August","September","October","November","December"],$scope.previousMonth=function(){var date=new Date($scope.current.year,$scope.current.month-1,1);setCurrentMonthAndYear(date.getMonth(),date.getFullYear()),$scope.updateDateMap()},$scope.nextMonth=function(){var date=new Date($scope.current.year,$scope.current.month+1,1);setCurrentMonthAndYear(date.getMonth(),date.getFullYear()),$scope.updateDateMap()},$scope.selectDate=function(time){var date=getStandardTime(new Date(time));dayIsOutOfRange(date)||(date.month!==$scope.current.month&&(setCurrentMonthAndYear(date.month,date.year),$scope.updateDateMap()),setSelectedDate(new Date(time)))},$scope.updateDateMap=function(){var rawCurrentDay=$scope.current.raw.getDay()*universal.DAY,firstWeekDay=new Date($scope.current.time-rawCurrentDay),isMonthComplete=!1;for($scope.dateMap=[];!isMonthComplete;){var week=[];5===$scope.dateMap.length&&(isMonthComplete=!0);for(var weekDay=0;7>weekDay;weekDay++){var rawThisDate=firstWeekDay.getTime()+weekDay*universal.DAY,thisDate=new Date(rawThisDate);23===thisDate.getHours()?thisDate=new Date(thisDate.getTime()+universal.HOUR):1===thisDate.getHours()&&(thisDate=new Date(thisDate.getTime()-universal.HOUR));var date=getStandardTime(thisDate);date.dayInMonth=thisDate.getMonth()===$scope.current.raw.getMonth()?"day-in-month":"",date.disabledDay=dayIsOutOfRange(date)?"disabled-day":"",week.push(date)}firstWeekDay=new Date(firstWeekDay.getTime()+7*universal.DAY),$scope.dateMap.push(week)}},initialize()}function Calendar(){var template='<table><tr><td ng-click="previousMonth()" title="Previous month" class="p">&lt;</td><td colspan="5">{{current.monthName}} {{current.year}}</td><td ng-click="nextMonth()" title="Next month" class="p">&gt;</td></tr><tr><td ng-repeat="day in days" title="{{day}}">{{day | limitTo : 2}}</td></tr><tr ng-repeat="week in dateMap"><td ng-repeat="current in week" ng-click="selectDate(current.time)" class="{{current.dayInMonth}} {{current.disabledDay}} p">{{current.date}}</td></tr><tr><td colspan="7">{{selected.day}}, {{selected.monthName}} {{selected.date}}, {{selected.year}}</td></tr></table>';return{restrict:"AE",scope:{config:"="},template:template,controller:CalendarController}}function Chart(){function _controller($scope,$filter){var config={max:0,height:200,width:200,xLabel:void 0,yLabel:void 0};$scope.config=angular.extend({},config,$scope.config),$scope.type=$scope.type||"bar",$scope.template=templates[$scope.type],"line"==$scope.type&&(config.max=$filter("orderBy")($scope.data,"-value")[0].value,angular.forEach($scope.data,function(line,index){line.x1=parseInt(index/$scope.data.length*config.width),line.y1=parseInt(($scope.data[index-1]?$scope.data[index-1].value:0)/config.max*config.height),line.x2=parseInt((index+1)/$scope.data.length*config.width),line.y2=parseInt(line.value/config.max*config.height)}))}var templates={base:'<div class="chart" style="width:{{width}}px; height:{{height}}px;">   <div class="y" style="width:{{height}}px;">{{yLabel}}</div>   <div class="x">{{xLabel}}</div></div>',line:'<svg style="width:{{config.width}}px; height:{{config.height}}px;">   <line        ng-repeat="line in data"        ng-attr-x1="{{line.x1}}"       ng-attr-y1="{{line.y1}}"       ng-attr-x2="{{line.x2}}"       ng-attr-y2="{{line.y2}}">   </line></svg>',dot:'<div   ng-repeat="dot in data"   class="dot"   style="bottom:{{dot.value / max * height}}px; left:{{($index + 0.5) / data.length * width}}px;"></div>',bar:'<svg style="width:{{config.width}}px; height:{{config.height}}px;">   <rect        ng-repeat="bar in data"       x="{{$index * (config.width / data.length)}}"       y="{{config.height - bar}}"       data-index="{{$index}}"       width="{{config.width / data.length}}"       height="{{bar}}"       style="fill:rgb(0,0,255);stroke-width:3;stroke:rgb(0,0,0)"></svg>'};return _controller.$inject=["$scope","$filter"],{restrict:"E",replace:!0,scope:{type:"@",config:"=",data:"="},template:templates.base,compile:function(element,attrs){var type=attrs.type||"bar";element.html(templates[type])},controller:_controller}}var bossy=angular.module("bossy",["bossy.calendar","bossy.data","bossy.dropdown","bossy.form","bossy.graph","bossy.input","bossy.numerictextbox","bossy.schema","bossy.tooltip","bossy.datagrid"]);Calendar.$inject=[],CalendarController.$inject=["$scope"],angular.module("bossy.calendar",[]).controller("bossyCalendarController",CalendarController).directive("bossyCalendar",Calendar);var app=angular.module("bossy.combobox.cascadingDropdown",[]);app.controller("AppCtrl",function($scope){$scope.choices={"Option A":{"Option A1":["Option A1a","Option A1b","Option A1c"],"Option A2":["Option A2a","Option A2b","Option A2c"],"Option A3":["Option A3a","Option A3b","Option A3c"]},"Option B":{"Option B1":["Option B1a","Option B1b","Option B1c"],"Option B2":["Option B2a","Option B2b","Option B2c"],"Option B3":["Option B3a","Option B3b","Option B3c"]},"Option C":{"Option C1":["Option C1a","Option C1b","Option C1c"],"Option C2":["Option C2a","Option C2b","Option C3b"],"Option C3":["Option C3a","Option C3b","Option C3c"]}}});var app=angular.module("bossy.combobox.checkboxMultiselect",[]);app.controller("AppCtrl",function($scope){$scope.choices=["Option A","Option B","Option C"],$scope.name={choices:[]},$scope.selectAll=function(){$scope.name.choices=angular.copy($scope.choices)},$scope.deselectAll=function(){$scope.name.choices=[]}}),app.directive("bossyCheckboxMultiselect",["$parse","$compile",function($parse,$compile){function addChoice(arr,item){arr=angular.isArray(arr)?arr:[];for(var i=0;i<arr.length;i++)if(angular.equals(arr[i],item))return arr;return arr.push(item),arr}function removeChoice(arr,item){if(angular.isArray(arr))for(var i=0;i<arr.length;i++)if(angular.equals(arr[i],item)){arr.splice(i,1);break}return arr}function containCheckbox(arr,item){if(angular.isArray(arr))for(var i=0;i<arr.length;i++)if(angular.equals(arr[i],item))return!0;return!1}function watch(scope,elem,attrs){$compile(elem)(scope);var getter=$parse(attrs.bossyCheckboxMultiselect),setter=getter.assign,value=$parse(attrs.bossyListValue)(scope.$parent);scope.$watch("checked",function(newValue,oldValue){if(newValue!==oldValue){var actual=getter(scope.$parent);newValue===!0?setter(scope.$parent,addChoice(actual,value)):setter(scope.$parent,removeChoice(actual,value))}}),scope.$parent.$watch(attrs.bossyCheckboxMultiselect,function(newArr){scope.checked=containCheckbox(newArr,value)},!0)}return{restrict:"AE",scope:!0,compile:function(tElement,tAttrs){return tElement.attr("ng-model","checked"),tElement.removeAttr("bossy-checkbox-multiselect"),watch}}}]);var app=angular.module("bossy.combobox.multiselect",[]);app.controller("AppCtrl",function($scope){$scope.choices=[{id:1,name:"Option A"},{id:2,name:"Option B"},{id:3,name:"Option C"}],$scope.selectedChoice=[]}),app.factory("optionParser",["$parse",function($parse){var TYPEAHEAD_REGEXP=/^\s*(.*?)(?:\s+as\s+(.*?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+(.*)$/;return{parse:function(input){var match=input.match(TYPEAHEAD_REGEXP);if(!match)throw new Error('Expected typeahead specification in form of "_modelValue_ (as _label_)? for _item_ in _collection_" but got "'+input+'".');return{itemName:match[3],source:$parse(match[4]),viewMapper:$parse(match[2]||match[1]),modelMapper:$parse(match[1])}}}}]),app.directive("bossyMultiselect",function($document,$compile,optionParser){return{restrict:"E",require:"ngModel",link:function(originalScope,element,attrs,modelCtrl){function parseModel(){for(var model=parsedResult.source(originalScope),i=0;i<model.length;i++){var local={};local[parsedResult.itemName]=model[i],scope.items.push({label:parsedResult.viewMapper(local),model:model[i],checked:!1})}}function selectMultiple(item){item.checked=!item.checked,setModelValue(!0)}function setModelValue(isMultiple){var value;isMultiple?(value=[],angular.forEach(scope.items,function(item){item.checked&&value.push(item.model)})):angular.forEach(scope.items,function(item){return item.checked?(value=item.model,!1):void 0}),modelCtrl.$setViewValue(value)}{var exp=attrs.options,parsedResult=optionParser.parse(exp),isMultiple=attrs.multiple?!0:!1,scope=originalScope.$new();attrs.change||angular.noop}scope.items=[],scope.multiple=isMultiple;var popUpEl=angular.element("<bossy-multiselect-popup></bossy-multiselect-popup>");parseModel(),element.append($compile(popUpEl)(scope)),scope.checkAll=function(){isMultiple&&(angular.forEach(scope.items,function(item){item.checked=!0}),setModelValue(!0))},scope.uncheckAll=function(){angular.forEach(scope.items,function(item){item.checked=!1}),setModelValue(!0)},scope.select=function(item){isMultiple!==!1&&selectMultiple(item)}}}}),app.directive("bossyMultiselectPopup",["$document",function($document){return{restrict:"E",scope:!1,replace:!0,templateUrl:"../templates/bossy.combobox.multiselect.html",link:function(scope,element,attr){}}}]),angular.module("bossy.data",[]).factory("$data",["$q","$http","$scope",function($q,$http,$scope){function _getData(data){return angular.isString(data)?_getRemoteData(data):angular.isObject(data)?data:angular.isFunction(data)?_getData(data.call($scope)):void console.error("directive.bossyForm: no data url or object given")}function _getRemoteData(data){var deferred=$q.defer();return $http.get(data,{responseType:"json"}).success(function(data){angular.isObject(data)?deferred.resolve(data):deferred.reject("directive.bossyForm: GET request to url did not produce data object")}).error(function(responseData,status){deferred.reject('directive.bossyForm: GET request to url "'+data+'" failed with status "'+status+'"')}),deferred.promise}return{getData:_getData}}]),angular.module("bossy.datagrid",[]).controller("DataGridController",["$scope",function($scope){var numberCompare=function(a,b){var result=0;return b>a?result=-1:a>b&&(result=1),result},stringCompare=function(a,b){return a.toLowerCase().localeCompare(b.toLowerCase())},formattedNumberCompare=function(a,b){return a=+a.replace(/[^\d.-]/gi,""),b=+b.replace(/[^\d.-]/gi,""),numberCompare(a,b)},columnCompare=function(a,b,columnIndex){var columnType=$scope.config.data.columns[columnIndex].type,result=0;return"number"===columnType?result=numberCompare(a[columnIndex],b[columnIndex]):"string"===columnType?result=stringCompare(a[columnIndex],b[columnIndex]):"money"===columnType&&(result=formattedNumberCompare(a[columnIndex],b[columnIndex])),result},calculateSortdirection=function(columnIndex){return $scope.config.data.columns[columnIndex].sortDirection=$scope.config.data.columns[columnIndex].sortDirection?-$scope.config.data.columns[columnIndex].sortDirection:1,$scope.config.data.columns[columnIndex].sortDirection};$scope.sortColumn=function(columnIndex){var sortDirection=calculateSortdirection(columnIndex);$scope.config.data.rows=$scope.config.data.rows.sort(function(a,b){return sortDirection*columnCompare(a,b,columnIndex)})}}]).directive("bossyDatagrid",[function(){return{restrict:"EA",scope:{config:"="},templateUrl:"bossy.datagrid.html",controller:"DataGridController"}}]),angular.module("bossy.dropdown",[]).run(function($templateCache){$templateCache.put("bossy-dropdown.html",'<div><select ng-options="item[dropdown.title] for item in dropdown.items | orderBy: dropdown.title" ng-model="selectedItem" ng-change="dropdown.updateSelectedItem(selectedItem)"><option value="" ng-hide="selectedItem">Please select one...</option></select></div>')}).directive("bossyDropdown",function($http,$compile){return{restrict:"EA",scope:{config:"=",select:"=",items:"="},templateUrl:"",link:function(scope,element,attrs){var customTemplate;customTemplate="<"!==scope.dropdown.template[0]?$compile('<ng-include src="dropdown.template"></ng-include>')(scope):$compile(scope.dropdown.template)(scope),element.replaceWith(customTemplate)},controller:function($scope){var thisDropdown=this;thisDropdown.title=$scope.config.title,thisDropdown.items=[],$scope.config.src?(".json"===$scope.config.src.substr($scope.config.src.length-5,$scope.config.src.length)?$http.get($scope.config.src).success(function(data){thisDropdown.items=data,thisDropdown.items[0].hasOwnProperty(thisDropdown.title)||console.error('ERROR: $scope.config.title: "'+$scope.config.title+'" is not a member of the loaded JSON data. Please specify a valid "title" to list.'),$scope.items&&($scope.items=thisDropdown.items)}).error(function(data){console.error('ERROR: Fail to load JSON data from the path: "'+$scope.config.src+'"')}):console.error('ERROR: "$scope.config.src": "'+$scope.config.src+'" is not a valid JSON file.'),thisDropdown.updateSelectedItem=function(selectedItem){$scope.config.select&&($scope.config.select=selectedItem),$scope.select&&($scope.select=selectedItem)},thisDropdown.template=$scope.config.template?$scope.config.template:"bossy-dropdown.html"):console.error('ERROR: "$scope.config.src" has not been specified within the "config" object. Please pass in a valid path to a JSON file.')},controllerAs:"dropdown"}}),angular.module("bossy.form",[]).run(function($templateCache){$templateCache.put("bossy-input.html","templates/bossy-input.html")}).directive("bossyForm",["$compile","$http","$schema","$data",function($compile,$http,$schema,$data){function setData(data){var result=$data.getData(data);return angular.isFunction(result.then)&&angular.isFunction(result["catch"])&&angular.isFunction(result["finally"])?result:void(_data=result)}function setSchema(schema){_schema=$schema.getSchema(schema)}function buildTemplate(schemaPart,parentKey,required){var template="",fullKey="";return angular.forEach(schemaPart,function(value,key){if(value.type)switch(console.log(fullKey+" is "+value.type),value.type){case"object":var requiredList="undefined"!=typeof value.required?value.required:null;template+=buildTemplate(value.properties,fullKey,requiredList);break;case"array":template+=buildTemplate(value.items.properties,fullKey);break;case"number":template+=_itemTemplate.number(value);break;case"string":var isRequired=!1;required&&-1!==required.indexOf(key)&&(isRequired=!0),template+=_itemTemplate.text(value,key,isRequired);break;case"boolean":template+=_itemTemplate.checkbox(value)}},this),template}var _schema,_data,_options={showLabels:!0,header:"This is header",footer:"This is footer",theme:"green",button:"Save"},_itemTemplate={number:function(){return'<input type="number"/>'},text:function(obj,key,isRequired){return"<bossy-input title=\"'"+obj.title+"'\" type=\"'"+obj.inputType+"'\" value=\"'"+_data.address[key]+"'\""+(isRequired?" required":"")+"></bossy-input>"},textArea:function(){return"<textarea></textarea>"},checkbox:function(obj){return'<div class="checkbox"><label><input type="checkbox">'+obj.title+"</label></div>"}};return{restrict:"E",replace:!0,template:"",scope:{config:"=",title:"="},link:function(scope,element,attributes){scope.config.options=angular.extend(_options,scope.config.options);var promise=setData(scope.config.data);setSchema(scope.config.schema),promise?(promise.then(function(result){_data=result,element.html('<form novalidate class="{{config.options.theme}}"><div class="banner page-header"><h3>{{config.options.header}}</h3></div>'+buildTemplate(_schema)+'<button ng-if="config.options.button">{{config.options.button}}</button><div class="page-footer"><h3>{{config.options.footer}}</h3></div></form>'),$compile(element.contents())(scope)},function(reason){}),element.html('<form novalidate class="{{config.options.theme}}">LOADING...</form>'),$compile(element.contents())(scope)):(element.html('<form novalidate class="{{config.options.theme}}"><div class="banner page-header"><h3>{{config.options.header}}</h3></div>'+buildTemplate(_schema)+'<button ng-if="config.options.button">{{config.options.button}}</button><div class="page-footer"><h3>{{config.options.footer}}</h3></div></form>'),$compile(element.contents())(scope))}}}]),Chart.$inject=[],angular.module("bossy.chart",[]).directive("bossyChart",Chart),function(){function Input($compile){function _controller($scope,$filter){var config={maxLength:0,height:200,width:200,type:"text",value:"",title:"title"};$scope.config=angular.extend({},config,$scope.config)}var templateDefault='<fieldset class="bossy-fieldset"> <legend class="bossy-legend">{{config.title}}</legend> <div class="bossy-input"> <input type="{{config.type}}" placeholder="{{config.placeholder}}" value="{{config.value}}"/> <span></span> </div> </fieldset>',templatePrefix='<fieldset class="bossy-fieldset"> <legend class="bossy-legend">{{config.title}}</legend> <div class="bossy-input"> <input class="prefix" type="{{config.type}}" placeholder="{{config.placeholder}}" value="{{config.value}}"/> <span></span> <span class="bossy-input-component bossy-input-prefix">{{config.prefixText}}</span> </div> </fieldset>',templatePostfix='<fieldset class="bossy-fieldset"> <legend class="bossy-legend">{{config.title}}</legend> <div class="bossy-input"> <input class="postfix" type="{{config.type}}" placeholder="{{config.placeholder}}" value="{{config.value}}"/> <span></span> <span class="bossy-input-component bossy-input-postfix">{{config.postfixText}}</span> </div> </fieldset>',getTemplate=function(templateType){var template="";switch(templateType){case"prefix":template=templatePrefix;break;case"postfix":template=templatePostfix;break;default:template=templateDefault}return template};return _controller.$inject=["$scope","$filter"],{restrict:"E",replace:!0,scope:{config:"="},link:function(scope,element,attrs){element.html(getTemplate(scope.config.templateType)),$compile(element.contents())(scope),scope.$watch(function($scope){return $scope.config.value},function(newVal,oldVal){console.log(newVal,oldVal)},!0)},template:templateDefault,controller:_controller}}Input.$inject=["$compile"],angular.module("bossy.input",[]).directive("bossyInput",Input)}();var app=angular.module("bossy.numerictextbox",[]);app.controller("bossynumericCtrl",function($scope){var symbols=["$","%","lbs"],initialValue=0,key={price:0,weight:0,discount:0,stock:0};$scope.p=symbols[0]+initialValue,$scope.w=initialValue+symbols[2],$scope.d=initialValue+symbols[1],$scope.s=initialValue,$scope.increment=function(a){switch(a){case"price":key.price++,$scope.p=symbols[0]+key.price;break;case"weight":key.weight++,$scope.w=key.weight+symbols[2];break;case"discount":key.discount++,$scope.d=key.discount+symbols[1];break;case"stock":key.stock++,$scope.s=key.stock}},$scope.decrement=function(a){switch(a){case"price":key.price>0&&(key.price--,$scope.p=symbols[0]+key.price);break;case"weight":key.weight>0&&(key.weight--,$scope.w=key.weight+symbols[2]);break;case"discount":key.discount>0&&(key.discount--,$scope.d=key.discount+symbols[1]);break;case"stock":key.stock>0&&(key.stock--,$scope.s=key.stock)}}}),app.directive("bossynumerictextbox",function(){return{controller:"bossynumericCtrl",restrict:"E",transclude:!0,templateUrl:"bossy.numerictextbox.html"}}),angular.module("bossy.schema",[]).factory("$schema",["$q","$http",function($q,$http){function _getSchema(schema){return angular.isString(schema)?_getRemoteSchema(schema):angular.isObject(schema)?schema:void console.error("directive.bossyForm: no schema url or object given")}function _getRemoteSchema(schema){var deferred=$q.defer();return $http.get(schema).success(function(data){angular.isObject(data)?deferred.resolve(data):deferred.reject("directive.bossyForm: GET request to url did not produce schema object")}).error(function(data,status){deferred.reject('directive.bossyForm: GET request to url "'+schema+'" failed with status "'+status+'"')}),deferred.promise}return{getSchema:_getSchema}}]);var app=angular.module("bossy.slider",[]);app.controller("SliderController",["$scope",function($scope){$scope.max=10,$scope.value=0,$scope.min=1,$scope.fillWidth=0,$scope.emptWidth=0,$scope.barWidth=250,$scope.barPiece=0,$scope.step=1,$scope.isMouseDown=0,$scope.yCord=0,$scope.xCord=0,$scope.newXCord=0,$scope.newYCord=0,$scope.orientation=!1,$scope.butSize=15,$scope.barfillcolor="#0000FF",$scope.baremptycolor="#D3D3D3",$scope.buttoncolor="#FF0000",$scope.makeBar=function(){$scope.value=parseInt(($scope.max+$scope.min)/2);for(var current=$scope.min;current<=$scope.max;current++)current<$scope.value&&$scope.fillWidth++,current>$scope.value&&$scope.emptWidth++;$scope.ngModel=$scope.value},$scope.increase=function(){$scope.value<$scope.max&&($scope.value=$scope.value+1,$scope.fillWidth++,$scope.emptWidth--,$scope.ngModel=$scope.value)},$scope.butIncrease=function(){var i=0;for(i=0;i<$scope.step;i++)$scope.increase()},$scope.decrease=function(){$scope.value>$scope.min&&($scope.value=$scope.value-1,$scope.fillWidth--,$scope.emptWidth++,$scope.ngModel=$scope.value)},$scope.butDecrease=function(){var i=0;for(i=0;i<$scope.step;i++)$scope.decrease()},$scope.keyBind=function(ev){$scope.pressed=ev.which,(37===$scope.pressed||40===$scope.pressed)&&$scope.butDecrease(),(38===$scope.pressed||39===$scope.pressed)&&$scope.butIncrease()},$scope.greyClick=function(event){$scope.butIncrease()},$scope.barClick=function(event){$scope.butDecrease()},$scope.drag=function(event){var x=event.clientX,y=event.clientY;if($scope.isMouseDown)if($scope.orientation)if(0===$scope.yCord)$scope.yCord=y;else{for($scope.newYCord=y;$scope.newYCord-$scope.yCord>$scope.barPiece/2;)$scope.yCord+=$scope.barPiece,$scope.decrease();for(;$scope.newYCord-$scope.yCord<-($scope.barPiece/2);)$scope.yCord-=$scope.barPiece,$scope.increase()}else if(0===$scope.xCord)$scope.xCord=x;else{for($scope.newXCord=x;$scope.newXCord-$scope.xCord>$scope.barPiece/2;)$scope.xCord+=$scope.barPiece,$scope.increase();for(;$scope.newXCord-$scope.xCord<-($scope.barPiece/2);)$scope.xCord-=$scope.barPiece,$scope.decrease()}},$scope.down=function(){$scope.newXCord=0,$scope.xCord=0,$scope.newYCord=0,$scope.yCord=0,$scope.isMouseDown=1},$scope.up=function(){$scope.newXCord=0,$scope.xCord=0,$scope.newYCord=0,$scope.yCord=0,$scope.isMouseDown=0}}]),app.directive("bossySlider",function($compile){var myTemplate;return{restrict:"AE",controller:"SliderController",scope:{ngModel:"="},link:{pre:function(scope,iElem,iAttr){var pattern=/^#[0-9a-fA-F]{6}$/;iAttr.max&&(scope.max=parseInt(iAttr.max),isNaN(scope.max)&&(scope.max=10)),iAttr.min&&(scope.min=parseInt(iAttr.min),isNaN(scope.min)&&(scope.min=1)),iAttr.barfillcolor&&pattern.test(iAttr.barfillcolor)&&(scope.barfillcolor=iAttr.barfillcolor),iAttr.baremptycolor&&pattern.test(iAttr.baremptycolor)&&(scope.baremptycolor=iAttr.baremptycolor),iAttr.buttoncolor&&pattern.test(iAttr.buttoncolor)&&(scope.buttoncolor=iAttr.buttoncolor),iAttr.step&&(scope.step=iAttr.step),iAttr.width?(scope.barWidth=iAttr.width,scope.barPiece=scope.barWidth/(scope.max-scope.min)):scope.barPiece=scope.barWidth/(scope.max-scope.min),iAttr.orientation&&"vertical"===iAttr.orientation?(scope.orientation=!0,myTemplate='<div onselectstart="return false;" ondragstart="return false;"ng-mouseleave="up()" ng-mousemove="drag($event)"><div ng-mousemove="drag($event)" ng-mouseup="up()" ng-click="greyClick()"style="cursor:pointer;margin-left:9px;width:5px;height:{{barPiece * emptWidth}}px;background-color:'+scope.baremptycolor+';margin-bottom:4px"></div><div ng-mousemove="drag($event)" ng-mousedown="down()" ng-mouseup="up()" orientation="vertical" style="cursor:ns-resize;margin-top:-4px;margin-left:5px;width:15px;height:15px;background-color:'+scope.buttoncolor+';border-radius:50%;"></div><div ng-mousemove="drag($event)" ng-mouseup="up()" ng-click="barClick()"style="cursor:pointer;margin-left:9px;width:5px;height:{{barPiece * fillWidth}}px;background-color:'+scope.barfillcolor+';margin-bottom:4px"></div></div>'):myTemplate='<div onselectstart="return false;" ondragstart="return false;" ng-mouseleave="up()"ng-mousemove="drag($event)"><div ng-mousemove="drag($event)" ng-mouseup="up()" ng-click="barClick()"style="cursor:pointer;display:inline-block;width:{{barPiece * fillWidth}}px;height:5px;background-color:'+scope.barfillcolor+';margin-bottom:4px"></div><div ng-mousemove="drag($event)" ng-mousedown="down()" ng-mouseup="up()" orientation="horizontal" style="cursor:ew-resize;display:inline-block;width:{{butSize}}px;height:{{butSize}}px;background-color:'+scope.buttoncolor+';border-radius:50%;"></div><div ng-mousemove="drag($event)" ng-mouseup="up()" ng-click="greyClick()"style="cursor:pointer;display:inline-block;width:{{barPiece * emptWidth}}px;height:5px;background-color:'+scope.baremptycolor+';margin-bottom:4px"></div></div>',iElem.html(myTemplate),$compile(iElem.contents())(scope),scope.makeBar()}}}}),angular.module("bossy.tooltip",[]).directive("bossyTooltip",function(){function _moveTip($parent,$tip,curPos){"n"===curPos?($tip.style.left=$parent.offsetLeft+$parent.offsetWidth/2-$tip.offsetWidth/2+"px",$tip.style.top=$parent.offsetTop-$tip.offsetHeight+"px"):"ne"===curPos?($tip.style.left=$parent.offsetLeft+$parent.offsetWidth+"px",$tip.style.top=$parent.offsetTop-$tip.offsetHeight+"px"):"e"===curPos?($tip.style.left=$parent.offsetLeft+$parent.offsetWidth+"px",$tip.style.top=$parent.offsetTop+$parent.offsetHeight/2-$tip.offsetHeight/2+"px"):"se"===curPos?($tip.style.left=$parent.offsetLeft+$parent.offsetWidth+"px",$tip.style.top=$parent.offsetTop+$parent.offsetHeight+"px"):"s"===curPos?($tip.style.left=$parent.offsetLeft+$parent.offsetWidth/2-$tip.offsetWidth/2+"px",$tip.style.top=$parent.offsetTop+$parent.offsetHeight+"px"):"sw"===curPos?($tip.style.left=$parent.offsetLeft-$tip.offsetWidth+"px",$tip.style.top=$parent.offsetTop+$parent.offsetHeight+"px"):"w"===curPos?($tip.style.left=$parent.offsetLeft-$tip.offsetWidth+"px",$tip.style.top=$parent.offsetTop+$parent.offsetHeight/2-$tip.offsetHeight/2+"px"):($tip.style.left=$parent.offsetLeft-$tip.offsetWidth+"px",$tip.style.top=$parent.offsetTop-$tip.offsetHeight+"px")}function _checkPos($tip){var rect=$tip.getBoundingClientRect();return rect.top>=0&&rect.left>=0&&rect.bottom<=(window.innerHeight||document.documentElement.clientHeight)&&rect.right<=(window.innerWidth||document.documentElement.clientWidth)}var _pos=["n","ne","e","se","s","sw","w","nw"];return{restrict:"E",scope:{config:"="},replace:!0,link:function(scope,element,attrs){if(!scope.config.title||!scope.config.body)return console.error("Error: No title or body information provided."),1;(!scope.config.position||"string"!=typeof scope.config.position||_pos.indexOf(scope.config.position)<0)&&(scope.config.position="n");var $tip=document.createElement("div");document.body.appendChild($tip),$tip.style.position="absolute",$tip.innerHTML="<span>"+scope.config.title+"</span><div>"+scope.config.body+"</div>",$tip.className="bossyTooltip",element[0].title="",console.log(element);var locked,i=0;do{if(locked=!0,_moveTip(element[0],$tip,scope.config.position),_checkPos($tip)||(locked=!1,scope.config.position="nw"===scope.config.position?"n":_pos[_pos.indexOf(scope.config.position)+1]),8===i)break;++i}while(locked===!1);$tip.style.display="none",element.on("mouseenter",function(){$tip.style.display="block"}).on("mouseleave",function(){$tip.style.display="none"})}}});