(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{111:function(t,e,a){t.exports={input:"AddItemForm_input__3zzJw"}},112:function(t,e,a){t.exports={wrapper:"EditableSpan_wrapper__2EP2T",textField:"EditableSpan_textField__2phs8",title:"EditableSpan_title__4XzLW"}},184:function(t,e,a){},188:function(t,e,a){},311:function(t,e,a){"use strict";a.r(e);var n={};a.r(n),a.d(n,"loginTC",(function(){return Z})),a.d(n,"logoutTC",(function(){return tt}));var r={};a.r(r),a.d(r,"initializeAppTC",(function(){return rt}));var s={};a.r(s),a.d(s,"fetchTodolistsTC",(function(){return pt})),a.d(s,"removeTodolistTC",(function(){return bt})),a.d(s,"addTodolistTC",(function(){return ft})),a.d(s,"changeTodolistTitleTC",(function(){return jt}));var c={};a.r(c),a.d(c,"fetchTasksTC",(function(){return Tt})),a.d(c,"deleteTaskTC",(function(){return It})),a.d(c,"addTaskTC",(function(){return wt})),a.d(c,"updateTaskTC",(function(){return Ct}));var i={};a.r(i),a.d(i,"getAuthIsLoggedIn",(function(){return Et}));var o={};a.r(o),a.d(o,"getTodolists",(function(){return Ft}));var u=a(0),l=a.n(u),d=a(37),p=a.n(d);a(184),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var b=a(27),f=a(17),j=a(361),h=a(371),O=(a(188),a(364)),m=a(360),x=a(362),v=a(10),k=a(111),g=a.n(k),y=a(352),T=a(359),I=a(349),w=a(58),C=a(2),S=l.a.memo((function(t){var e=t.addItem,a=t.disabled,n=t.className;console.log("AddItemForm called");var r=Object(u.useState)(""),s=Object(v.a)(r,2),c=s[0],i=s[1],o=Object(u.useState)(!1),l=Object(v.a)(o,2),d=l[0],p=l[1];Object(u.useEffect)((function(){d&&setTimeout((function(){p(!1)}),3e3)}),[d]);var b=function(){""!==c.trim()?(e(c.trim()),i("")):p(!0)};return Object(C.jsxs)("div",{className:Object(w.a)(n,g.a.input),children:[Object(C.jsx)(y.a,{label:"Write some...",variant:"outlined",value:c,onChange:function(t){return i(t.currentTarget.value)},onKeyPress:function(t){"Enter"===t.key&&b()},error:d,helperText:d&&"Field is required",inputProps:{maxLength:30},disabled:a}),Object(C.jsx)(T.a,{onClick:b,className:g.a.button,variant:"contained",children:Object(C.jsx)(I.a,{})})]})})),_=a(350),E=a(363),N=a(78),F=a.n(N),L=a(354),W=a(14),D=a(21),P=a(19),A=a(20),V=a(161),z=a.n(V),R=function(t){return t[t.New=0]="New",t[t.InProgress=1]="InProgress",t[t.Completed=2]="Completed",t[t.Draft=3]="Draft",t}({}),q=z.a.create({baseURL:"https://social-network.samuraijs.com/api/1.1/",withCredentials:!0,headers:{"API-KEY":"8074858c-0737-4322-ae35-ab3cabfe40b4"}}),M=function(){function t(){Object(P.a)(this,t)}return Object(A.a)(t,null,[{key:"getTodolists",value:function(){var t=Object(D.a)(Object(W.a)().mark((function t(){return Object(W.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,q.get("/todo-lists");case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}()},{key:"createTodolist",value:function(){var t=Object(D.a)(Object(W.a)().mark((function t(e){return Object(W.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,q.post("/todo-lists",{title:e});case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},{key:"deleteTodolist",value:function(){var t=Object(D.a)(Object(W.a)().mark((function t(e){return Object(W.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,q.delete("/todo-lists/".concat(e));case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},{key:"updateTodolist",value:function(){var t=Object(D.a)(Object(W.a)().mark((function t(e,a){return Object(W.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,q.put("/todo-lists/".concat(e),{title:a});case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(e,a){return t.apply(this,arguments)}}()},{key:"getTasks",value:function(){var t=Object(D.a)(Object(W.a)().mark((function t(e){return Object(W.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,q.get("/todo-lists/".concat(e,"/tasks"));case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},{key:"createTask",value:function(){var t=Object(D.a)(Object(W.a)().mark((function t(e,a){return Object(W.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,q.post("/todo-lists/".concat(e,"/tasks"),{title:a});case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(e,a){return t.apply(this,arguments)}}()},{key:"updateTask",value:function(){var t=Object(D.a)(Object(W.a)().mark((function t(e,a,n){return Object(W.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,q.put("/todo-lists/".concat(e,"/tasks/").concat(a),n);case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(e,a,n){return t.apply(this,arguments)}}()},{key:"deleteTask",value:function(){var t=Object(D.a)(Object(W.a)().mark((function t(e,a){return Object(W.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,q.delete("/todo-lists/".concat(e,"/tasks/").concat(a));case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(e,a){return t.apply(this,arguments)}}()},{key:"login",value:function(){var t=Object(D.a)(Object(W.a)().mark((function t(e){var a,n,r,s;return Object(W.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=e.email,n=e.password,r=e.rememberMe,s=e.captcha,t.next=3,q.post("/auth/login",{email:a,password:n,rememberMe:r,captcha:s||!1});case 3:return t.abrupt("return",t.sent);case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},{key:"logout",value:function(){var t=Object(D.a)(Object(W.a)().mark((function t(){return Object(W.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,q.delete("/auth/login");case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}()},{key:"authMe",value:function(){var t=Object(D.a)(Object(W.a)().mark((function t(){return Object(W.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,q.get("/auth/me");case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}()}]),t}(),B=a(112),G=a.n(B),J=l.a.memo((function(t){var e=t.value,a=t.changeItem,n=t.itemId,r=t.disabled,s=Object(u.useState)(e),c=Object(v.a)(s,2),i=c[0],o=c[1],l=Object(u.useState)(!1),d=Object(v.a)(l,2),p=d[0],b=d[1];return Object(C.jsx)("div",{className:G.a.wrapper,children:p?Object(C.jsx)(y.a,{label:"Write some...",variant:"outlined",value:i,onChange:function(t){return o(t.currentTarget.value)},onBlur:function(){b(!1),a(i,n)},multiline:!0,inputProps:{maxLength:30},disabled:r,className:G.a.textField,autoFocus:!0}):Object(C.jsx)("span",{onDoubleClick:function(){r||b(!0)},children:e})})})),U=a(96),K=a.n(U),X=l.a.memo((function(t){var e=t.task,a=t.todolistId,n=t.changeCheckStatus,r=t.changeTaskTitle,s=t.removeTask,c=Object(u.useCallback)((function(t,e){r(t,e,a)}),[a,r]);return Object(C.jsxs)("li",{className:Object(w.a)(K.a.task,e.status===R.Completed&&K.a.is_done),children:[Object(C.jsx)(L.a,{checked:e.status===R.Completed,onChange:function(){var t=e.status===R.Completed?R.New:R.Completed;n(e.id,a,t)},disabled:"loading"===e.entityStatus}),Object(C.jsx)(J,{value:e.title,changeItem:c,itemId:e.id,disabled:"loading"===e.entityStatus}),Object(C.jsx)(E.a,{"aria-label":"delete",onClick:function(){return s(e.id,a)},className:Object(w.a)(K.a.button,"trash"),disabled:"loading"===e.entityStatus,children:Object(C.jsx)(_.a,{})})]})})),H=a(35),Y=function(t){var e=Object(b.b)();return Object(u.useMemo)((function(){return Object(H.b)(t,e)}),[t,e])},$=a(18),Q=a(22),Z=Object(Q.b)("auth/login",function(){var t=Object(D.a)(Object(W.a)().mark((function t(e,a){var n,r;return Object(W.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.dispatch(ot({status:"loading"})),t.prev=1,t.next=4,M.login(e);case 4:if(n=t.sent,0!==(r=n.data).resultCode){t.next=10;break}a.dispatch(ot({status:"succeeded"})),t.next=12;break;case 10:return lt(r.messages,a.dispatch),t.abrupt("return",a.rejectWithValue(null));case 12:t.next=18;break;case 14:return t.prev=14,t.t0=t.catch(1),dt(t.t0,a.dispatch),t.abrupt("return",a.rejectWithValue(null));case 18:case"end":return t.stop()}}),t,null,[[1,14]])})));return function(e,a){return t.apply(this,arguments)}}()),tt=Object(Q.b)("auth/logout",function(){var t=Object(D.a)(Object(W.a)().mark((function t(e,a){var n,r;return Object(W.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.dispatch(ot({status:"loading"})),t.prev=1,t.next=4,M.logout();case 4:if(n=t.sent,0!==(r=n.data).resultCode){t.next=10;break}a.dispatch(ot({status:"succeeded"})),t.next=12;break;case 10:return lt(r.messages,a.dispatch),t.abrupt("return",a.rejectWithValue(null));case 12:t.next=18;break;case 14:return t.prev=14,t.t0=t.catch(1),dt(t.t0,a.dispatch),t.abrupt("return",a.rejectWithValue(null));case 18:case"end":return t.stop()}}),t,null,[[1,14]])})));return function(e,a){return t.apply(this,arguments)}}()),et=Object(Q.c)({name:"auth",initialState:{isLoggedIn:!1},reducers:{setIsLoggedIn:function(t,e){t.isLoggedIn=e.payload.value}},extraReducers:function(t){t.addCase(Z.fulfilled,(function(t,e){t.isLoggedIn=!0})),t.addCase(tt.fulfilled,(function(t,e){t.isLoggedIn=!1}))}}),at=et.reducer,nt=et.actions.setIsLoggedIn,rt=Object(Q.b)("app/initializeApp",function(){var t=Object(D.a)(Object(W.a)().mark((function t(e,a){var n,r,s;return Object(W.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=a.dispatch,r=a.rejectWithValue,t.prev=1,t.next=4,M.authMe();case 4:s=t.sent,0===s.data.resultCode&&n(nt({value:!0})),t.next=13;break;case 9:return t.prev=9,t.t0=t.catch(1),dt(t.t0,n),t.abrupt("return",r(null));case 13:case"end":return t.stop()}}),t,null,[[1,9]])})));return function(e,a){return t.apply(this,arguments)}}()),st=Object(Q.c)({name:"app",initialState:{loadingStatus:"idle",error:null,initialized:!1},reducers:{setLoadingStatus:function(t,e){t.loadingStatus=e.payload.status},setError:function(t,e){t.error=e.payload.error}},extraReducers:function(t){t.addCase(rt.fulfilled,(function(t,e){t.initialized=!0}))}}),ct=st.reducer,it=st.actions,ot=it.setLoadingStatus,ut=it.setError,lt=function(t,e){t.length?e(ut({error:t[0]})):e(ut({error:"Some error occurred"})),e(ot({status:"failed"}))},dt=function(t,e){t instanceof Error&&(e(ut({error:t.message})),e(ot({status:"failed"})))},pt=Object(Q.b)("todolists/fetchTodolists",function(){var t=Object(D.a)(Object(W.a)().mark((function t(e,a){var n,r,s,c;return Object(W.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=a.dispatch,r=a.rejectWithValue,t.prev=1,n(ot({status:"loading"})),t.next=5,M.getTodolists();case 5:return s=t.sent,c=s.data,n(ot({status:"succeeded"})),t.abrupt("return",{todolists:c});case 11:return t.prev=11,t.t0=t.catch(1),dt(t.t0,n),t.abrupt("return",r(null));case 15:case"end":return t.stop()}}),t,null,[[1,11]])})));return function(e,a){return t.apply(this,arguments)}}()),bt=Object(Q.b)("todolists/removeTodolist",function(){var t=Object(D.a)(Object(W.a)().mark((function t(e,a){var n,r,s,c;return Object(W.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=a.dispatch,r=a.rejectWithValue,t.prev=1,n(ot({status:"loading"})),n(xt({todolistId:e,entityStatus:"loading"})),t.next=6,M.deleteTodolist(e);case 6:if(s=t.sent,0!==(c=s.data).resultCode){t.next=14;break}return n(ot({status:"succeeded"})),n(xt({todolistId:e,entityStatus:"idle"})),t.abrupt("return",{todolistId:e});case 14:return lt(c.messages,n),n(xt({todolistId:e,entityStatus:"failed"})),t.abrupt("return",r(null));case 17:t.next=24;break;case 19:return t.prev=19,t.t0=t.catch(1),dt(t.t0,n),n(xt({todolistId:e,entityStatus:"failed"})),t.abrupt("return",r(null));case 24:case"end":return t.stop()}}),t,null,[[1,19]])})));return function(e,a){return t.apply(this,arguments)}}()),ft=Object(Q.b)("todolists/addTodolist",function(){var t=Object(D.a)(Object(W.a)().mark((function t(e,a){var n,r,s,c;return Object(W.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=a.dispatch,r=a.rejectWithValue,t.prev=1,n(ot({status:"loading"})),t.next=5,M.createTodolist(e);case 5:if(s=t.sent,0!==(c=s.data).resultCode){t.next=12;break}return n(ot({status:"succeeded"})),t.abrupt("return",{todolist:c.data.item});case 12:return lt(c.messages,n),t.abrupt("return",r(null));case 14:t.next=20;break;case 16:return t.prev=16,t.t0=t.catch(1),dt(t.t0,n),t.abrupt("return",r(null));case 20:case"end":return t.stop()}}),t,null,[[1,16]])})));return function(e,a){return t.apply(this,arguments)}}()),jt=Object(Q.b)("todolists/changeTodolistTitle",function(){var t=Object(D.a)(Object(W.a)().mark((function t(e,a){var n,r,s,c,i,o;return Object(W.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.todolistId,r=e.newTitle,s=a.dispatch,c=a.rejectWithValue,t.prev=2,s(ot({status:"loading"})),t.next=6,M.updateTodolist(n,r);case 6:if(i=t.sent,0!==(o=i.data).resultCode){t.next=13;break}return s(ot({status:"succeeded"})),t.abrupt("return",{todolistId:n,newTitle:r});case 13:return lt(o.messages,s),t.abrupt("return",c(null));case 15:t.next=21;break;case 17:return t.prev=17,t.t0=t.catch(2),dt(t.t0,s),t.abrupt("return",c(null));case 21:case"end":return t.stop()}}),t,null,[[2,17]])})));return function(e,a){return t.apply(this,arguments)}}()),ht=Object(Q.c)({name:"todolists",initialState:[],reducers:{changeTodolistFilter:function(t,e){var a=t.findIndex((function(t){return t.id===e.payload.todolistId}));a>-1&&(t[a].filter=e.payload.filter)},changeTodolistEntityStatus:function(t,e){var a=t.findIndex((function(t){return t.id===e.payload.todolistId}));a>-1&&(t[a].entityStatus=e.payload.entityStatus)}},extraReducers:function(t){t.addCase(pt.fulfilled,(function(t,e){return e.payload.todolists.map((function(t){return Object($.a)(Object($.a)({},t),{},{filter:"all",entityStatus:"idle"})}))})),t.addCase(bt.fulfilled,(function(t,e){return t.filter((function(t){return t.id!==e.payload.todolistId}))})),t.addCase(ft.fulfilled,(function(t,e){t.unshift(Object($.a)(Object($.a)({},e.payload.todolist),{},{filter:"all",entityStatus:"idle"}))})),t.addCase(jt.fulfilled,(function(t,e){var a=t.findIndex((function(t){return t.id===e.payload.todolistId}));a>-1&&(t[a].title=e.payload.newTitle)}))}}),Ot=ht.reducer,mt=ht.actions,xt=mt.changeTodolistEntityStatus,vt=(mt.changeTodolistFilter,a(39)),kt=Object(Q.c)({name:"tasks",initialState:{},reducers:{changeTaskEntityStatus:function(t,e){var a,n=Object(vt.a)(t[e.payload.todolistId]);try{for(n.s();!(a=n.n()).done;){var r=a.value;if(r.id===e.payload.taskId){r.entityStatus=e.payload.entityStatus;break}}}catch(s){n.e(s)}finally{n.f()}}},extraReducers:function(t){t.addCase(ft.fulfilled,(function(t,e){t[e.payload.todolist.id]=[]})),t.addCase(bt.fulfilled,(function(t,e){delete t[e.payload.todolistId]})),t.addCase(pt.fulfilled,(function(t,e){e.payload.todolists.forEach((function(e){t[e.id]=[]}))})),t.addCase(Tt.fulfilled,(function(t,e){t[e.payload.todolistId]=e.payload.tasks.map((function(t){return Object($.a)(Object($.a)({},t),{},{entityStatus:"idle"})}))})),t.addCase(It.fulfilled,(function(t,e){var a=t[e.payload.todolistId],n=a.findIndex((function(t){return t.id===e.payload.taskId}));a.splice(n,1)})),t.addCase(wt.fulfilled,(function(t,e){var a=Object($.a)(Object($.a)({},e.payload.task),{},{entityStatus:"idle"});t[e.payload.todolistId].unshift(a)})),t.addCase(Ct.fulfilled,(function(t,e){var a=t[e.payload.todolistId],n=a.findIndex((function(t){return t.id===e.payload.taskId}));a[n]=Object($.a)(Object($.a)({},a[n]),e.payload.updateData)}))}}),gt=kt.reducer,yt=kt.actions.changeTaskEntityStatus,Tt=Object(Q.b)("tasks/fetchTasks",function(){var t=Object(D.a)(Object(W.a)().mark((function t(e,a){var n,r;return Object(W.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.dispatch(ot({status:"loading"})),t.prev=1,t.next=4,M.getTasks(e);case 4:return n=t.sent,r=n.data.items,a.dispatch(ot({status:"succeeded"})),t.abrupt("return",{todolistId:e,tasks:r});case 10:t.prev=10,t.t0=t.catch(1),dt(t.t0,a.dispatch);case 13:case"end":return t.stop()}}),t,null,[[1,10]])})));return function(e,a){return t.apply(this,arguments)}}()),It=Object(Q.b)("tasks/deleteTask",function(){var t=Object(D.a)(Object(W.a)().mark((function t(e,a){var n,r;return Object(W.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.taskId,r=e.todolistId,a.dispatch(ot({status:"loading"})),a.dispatch(yt({todolistId:r,taskId:n,entityStatus:"loading"})),t.prev=3,t.next=6,M.deleteTask(r,n);case 6:return a.dispatch(ot({status:"succeeded"})),a.dispatch(yt({todolistId:r,taskId:n,entityStatus:"idle"})),t.abrupt("return",{todolistId:r,taskId:n});case 11:t.prev=11,t.t0=t.catch(3),dt(t.t0,a.dispatch),a.dispatch(yt({todolistId:r,taskId:n,entityStatus:"failed"}));case 15:case"end":return t.stop()}}),t,null,[[3,11]])})));return function(e,a){return t.apply(this,arguments)}}()),wt=Object(Q.b)("tasks/addTask",function(){var t=Object(D.a)(Object(W.a)().mark((function t(e,a){var n,r,s,c,i,o;return Object(W.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.todolistId,r=e.title,s=a.dispatch,c=a.rejectWithValue,s(ot({status:"loading"})),s(xt({todolistId:n,entityStatus:"loading"})),t.prev=4,t.next=7,M.createTask(n,r);case 7:if(i=t.sent,0!==(o=i.data).resultCode){t.next=15;break}return s(ot({status:"succeeded"})),s(xt({todolistId:n,entityStatus:"idle"})),t.abrupt("return",{todolistId:n,task:o.data.item});case 15:return lt(o.messages,s),s(xt({todolistId:n,entityStatus:"failed"})),t.abrupt("return",c(null));case 18:t.next=25;break;case 20:return t.prev=20,t.t0=t.catch(4),dt(t.t0,s),s(xt({todolistId:n,entityStatus:"failed"})),t.abrupt("return",c(null));case 25:case"end":return t.stop()}}),t,null,[[4,20]])})));return function(e,a){return t.apply(this,arguments)}}()),Ct=Object(Q.b)("tasks/updateTask",function(){var t=Object(D.a)(Object(W.a)().mark((function t(e,a){var n,r,s,c,i,o,u,l,d;return Object(W.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=e.todolistId,r=e.taskId,s=e.updateData,c=a.dispatch,i=a.getState,o=a.rejectWithValue,t.prev=2,c(ot({status:"loading"})),c(yt({todolistId:n,taskId:r,entityStatus:"loading"})),u=i(),l=u.tasks[n],!(d=l.find((function(t){return t.id===r})))){t.next=16;break}return t.next=11,M.updateTask(n,r,Object($.a)({title:d.title,startDate:d.startDate,priority:d.priority,description:d.description,deadline:d.deadline,completed:d.completed,status:d.status},s));case 11:return c(ot({status:"succeeded"})),c(yt({todolistId:n,taskId:r,entityStatus:"idle"})),t.abrupt("return",{todolistId:n,taskId:r,updateData:s});case 16:return lt(["\u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u043e\u0431\u043d\u043e\u0432\u0438\u0442\u044c \u0442\u0430\u0441\u043a\u0443"],c),t.abrupt("return",o(null));case 18:t.next=25;break;case 20:return t.prev=20,t.t0=t.catch(2),dt(t.t0,c),c(yt({todolistId:n,taskId:r,entityStatus:"failed"})),t.abrupt("return",o(null));case 25:case"end":return t.stop()}}),t,null,[[2,20]])})));return function(e,a){return t.apply(this,arguments)}}()),St=Object($.a)(Object($.a)({},c),kt.actions),_t=l.a.memo((function(t){var e,a=t.title,n=t.filter,r=t.entityStatus,s=t.todolistId,c=t.changeFilter,i=t.removeTodolist,o=t.changeTodolistTitle,l=Y(St),d=l.fetchTasksTC,p=l.deleteTaskTC,f=l.addTaskTC,j=l.updateTaskTC,h=Object(b.c)(function(t){return function(e){return e.tasks[t]}}(s));Object(u.useEffect)((function(){d(s)}),[s,d]);var O=Object(u.useCallback)((function(t,e){p({taskId:t,todolistId:e})}),[p]),m=Object(u.useCallback)((function(t,e){f({todolistId:e,title:t})}),[f]),x=Object(u.useCallback)((function(t,e,a){j({taskId:t,todolistId:e,updateData:{status:a}})}),[j]),v=Object(u.useCallback)((function(t,e,a){j({taskId:e,todolistId:a,updateData:{title:t}})}),[j]),k=Object(u.useCallback)((function(t){return m(t,s)}),[s,m]),g=h;return"active"===n&&(g=g.filter((function(t){return t.status===R.New}))),"completed"===n&&(g=g.filter((function(t){return t.status===R.Completed}))),Object(C.jsxs)("div",{className:F.a.todolist,children:[Object(C.jsxs)("div",{className:F.a.todolist_title,children:[Object(C.jsx)(J,{value:a,changeItem:o,itemId:s,disabled:"loading"===r}),Object(C.jsx)(E.a,{"aria-label":"delete",onClick:function(){return i(s)},className:Object(w.a)(F.a.button,"trash"),disabled:"loading"===r,children:Object(C.jsx)(_.a,{})})]}),Object(C.jsx)(S,{addItem:k,disabled:"loading"===r}),Object(C.jsx)("ul",{className:F.a.tasks,children:null===(e=g)||void 0===e?void 0:e.map((function(t){return Object(C.jsx)(X,{task:t,todolistId:s,changeCheckStatus:x,changeTaskTitle:v,removeTask:O},t.id)}))}),Object(C.jsxs)("div",{children:[Object(C.jsx)(T.a,{onClick:function(){return c("all",s)},variant:"all"===n?"contained":"text",children:"All"}),Object(C.jsx)(T.a,{onClick:function(){return c("active",s)},variant:"active"===n?"contained":"text",color:"success",children:"Active"}),Object(C.jsx)(T.a,{onClick:function(){return c("completed",s)},variant:"completed"===n?"contained":"text",color:"secondary",children:"Completed"})]})]})})),Et=function(t){return t.auth.isLoggedIn},Nt=Object($.a)({},n),Ft=function(t){return t.todolists},Lt=Object($.a)(Object($.a)({},s),ht.actions),Wt=function(){var t=Y(Lt),e=t.fetchTodolistsTC,a=t.removeTodolistTC,n=t.addTodolistTC,r=t.changeTodolistTitleTC,s=t.changeTodolistFilter,c=Object(b.c)(o.getTodolists),l=Object(b.c)(i.getAuthIsLoggedIn);Object(u.useEffect)((function(){l&&e()}),[l,e]);var d=Object(u.useCallback)((function(t,e){s({todolistId:e,filter:t})}),[s]),p=Object(u.useCallback)((function(t){a(t)}),[a]),j=Object(u.useCallback)((function(t){n(t)}),[n]),h=Object(u.useCallback)((function(t,e){r({todolistId:e,newTitle:t})}),[r]);return l?Object(C.jsx)(C.Fragment,{children:Object(C.jsxs)(O.a,{fixed:!0,children:[Object(C.jsx)(S,{addItem:j,className:"input-todolist"}),Object(C.jsx)(m.a,{container:!0,spacing:5,children:c.map((function(t){return Object(C.jsx)(m.a,{item:!0,children:Object(C.jsx)(x.a,{className:"paper",children:Object(C.jsx)(_t,{title:t.title,filter:t.filter,entityStatus:t.entityStatus,todolistId:t.id,changeFilter:d,removeTodolist:p,changeTodolistTitle:h})})},t.id)}))})]})}):Object(C.jsx)(f.a,{to:"/auth"})},Dt=a(167),Pt=a(79),At=a(357),Vt=a(347),zt=a(365),Rt=a(366),qt=function(){var t=Y(Nt).loginTC,e=Object(b.c)(i.getAuthIsLoggedIn),a=Object(Dt.a)({initialValues:{email:"",password:"",checkbox:!1},validationSchema:Pt.b({email:Pt.c().email("Invalid email address").required("Required"),password:Pt.c().min(2,"Password must be more 2 characters").required("Required"),checkbox:Pt.a()}),onSubmit:function(e){t(e),a.resetForm()}});return e?Object(C.jsx)(f.a,{to:"/"}):Object(C.jsx)(m.a,{container:!0,justifyContent:"center",children:Object(C.jsx)(m.a,{item:!0,justifyContent:"center",children:Object(C.jsx)("form",{onSubmit:function(t){t.preventDefault(),a.handleSubmit()},children:Object(C.jsxs)(At.a,{children:[Object(C.jsxs)(Vt.a,{children:[Object(C.jsxs)("p",{children:["To log in get registered",Object(C.jsxs)("a",{href:"https://social-network.samuraijs.com/",target:"_blank",rel:"noreferrer",children:[" ","here"]})]}),Object(C.jsx)("p",{children:"or use common test account credentials:"}),Object(C.jsx)("p",{children:"Email: free@samuraijs.com"}),Object(C.jsx)("p",{children:"Password: free"})]}),Object(C.jsxs)(zt.a,{children:[Object(C.jsx)(y.a,Object($.a)(Object($.a)({id:"email",type:"email",label:"Email",margin:"normal"},a.getFieldProps("email")),{},{error:!(!a.touched.email||!a.errors.email)})),a.touched.email&&a.errors.email?Object(C.jsx)("div",{style:{color:"rgb(211, 47, 47)"},children:a.errors.email}):null,Object(C.jsx)(y.a,Object($.a)(Object($.a)({id:"password",type:"password",label:"Password",margin:"normal"},a.getFieldProps("password")),{},{error:!(!a.touched.password||!a.errors.password)})),a.touched.password&&a.errors.password?Object(C.jsx)("div",{style:{color:"rgb(211, 47, 47)"},children:a.errors.password}):null,Object(C.jsx)(Rt.a,{id:"checkbox",label:"Remember me",control:Object(C.jsx)(L.a,{})}),Object(C.jsx)(T.a,{type:"submit",variant:"contained",color:"primary",children:"Login"})]})]})})})})},Mt=a(368),Bt=a(369),Gt=a(367),Jt=a(370),Ut=a(356),Kt=a(355),Xt=function(t){return t.app.initialized},Ht=function(t){return t.app.error},Yt=function(t){return t.app.loadingStatus},$t=Object($.a)(Object($.a)({},r),{},{setError:st.actions.setError}),Qt=l.a.forwardRef((function(t,e){return Object(C.jsx)(Kt.a,Object($.a)({elevation:6,ref:e,variant:"filled"},t))})),Zt=l.a.memo((function(){var t=Y($t).setError,e=Object(b.c)(Ht),a=function(e,a){"clickaway"!==a&&t({error:null})};return Object(C.jsx)(Ut.a,{open:null!==e,autoHideDuration:3e3,onClose:a,anchorOrigin:{vertical:"bottom",horizontal:"center"},children:Object(C.jsx)(Qt,{severity:"error",onClose:a,children:e})})})),te=function(){var t=Y(Nt).logoutTC,e=Object(b.c)(Yt),a=Object(b.c)(Et);return Object(C.jsxs)(C.Fragment,{children:[Object(C.jsxs)(Mt.a,{position:"static",className:"app-bar",children:[Object(C.jsxs)(Bt.a,{children:[Object(C.jsx)(Gt.a,{variant:"h6",component:"div",sx:{flexGrow:1},children:"Todo App"}),a&&Object(C.jsx)(T.a,{color:"inherit",onClick:function(){return t()},children:"Log out"})]}),"loading"===e&&Object(C.jsx)(j.a,{sx:{width:"100%"},className:"linear-progress",children:Object(C.jsx)(Jt.a,{color:"inherit"})})]}),Object(C.jsx)(Zt,{}),Object(C.jsx)(f.b,{})]})},ee=function(){var t=Y($t).initializeAppTC,e=Object(b.c)(Xt);return Object(u.useEffect)((function(){t()}),[t]),e?Object(C.jsx)(C.Fragment,{children:Object(C.jsx)(f.e,{children:Object(C.jsxs)(f.c,{path:"/",element:Object(C.jsx)(te,{}),children:[Object(C.jsx)(f.c,{index:!0,element:Object(C.jsx)(Wt,{})}),Object(C.jsx)(f.c,{path:"auth",element:Object(C.jsx)(qt,{})}),Object(C.jsx)(f.c,{path:"*",element:Object(C.jsx)("h1",{children:"404: PAGE NOT FOUND"})})]})})}):Object(C.jsx)(j.a,{sx:{display:"flex"},className:"circularProgress",children:Object(C.jsx)(h.a,{})})},ae=a(76),ne=Object(H.c)({tasks:gt,todolists:Ot,app:ct,auth:at}),re=Object(Q.a)({reducer:ne,middleware:function(t){return t().prepend(ae.a)}}),se=a(63);p.a.render(Object(C.jsx)(b.a,{store:re,children:Object(C.jsx)(se.a,{children:Object(C.jsx)(ee,{})})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))},78:function(t,e,a){t.exports={todolist_title:"Todolist_todolist_title__3Dqqd",button:"Todolist_button__2Op2U",todolist:"Todolist_todolist__2WIdX",tasks:"Todolist_tasks__3NOlq"}},96:function(t,e,a){t.exports={task:"Task_task__29kGR",is_done:"Task_is_done__2kiB5"}}},[[311,1,2]]]);
//# sourceMappingURL=main.92ee526b.chunk.js.map