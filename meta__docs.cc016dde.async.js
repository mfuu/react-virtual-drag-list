"use strict";(self.webpackChunkreact_virtual_sortable=self.webpackChunkreact_virtual_sortable||[]).push([[904],{88517:function(c,a,e){var d;e.r(a),e.d(a,{demos:function(){return D}});var l=e(15009),o=e.n(l),P=e(5574),b=e.n(P),x=e(49677),O=e.n(x),M=e(99289),E=e.n(M),m=e(67294),A=e(76395),I=e(58940),p=e(20408),D={"docs-demo-basic-demo-0":{component:m.memo(m.lazy(E()(o()().mark(function g(){var n,_,s,u,v,r;return o()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return r=function(){var j=n.useState(v(1e3,0)),i=b()(j,2),T=i[0],w=i[1],L=function(f){w(function(){return f.list})};return n.createElement(s,{dataKey:"id",dataSource:T,onDrop:L,handle:".handle",chosenClass:"chosen",className:"virtual-list"},function(y,f,K){return n.createElement("div",{className:"list-item"},n.createElement("div",{className:"item-title"},n.createElement("span",{className:"index"},"#",y.index),n.createElement("span",{className:"handle"},"\u2630")),n.createElement("p",null,y.desc))})},t.next=3,Promise.resolve().then(e.t.bind(e,67294,19));case 3:return n=t.sent,t.next=6,Promise.all([e.e(867),e.e(206)]).then(e.bind(e,62206));case 6:return _=t.sent,s=_.default,t.next=10,Promise.resolve().then(e.bind(e,20408));case 10:return u=t.sent,v=u.getPageData,t.t0=O(),t.next=15,Promise.resolve().then(e.bind(e,58940));case 15:return t.t1=t.sent,(0,t.t0)(t.t1),t.abrupt("return",{default:r});case 18:case"end":return t.stop()}},g)})))),asset:{type:"BLOCK",id:"docs-demo-basic-demo-0",refAtomIds:[],dependencies:{"index.jsx":{type:"FILE",value:`import * as React from 'react';
import VirtualList from '@/index';
import { getPageData } from '../public/sentence';
import '../global.less';

function Virtual() {

  const [list, setList] = React.useState(getPageData(1000, 0));

  const handleDrop = (params) => {
    setList(() => params.list);
  }

  return (
    <VirtualList
      dataKey="id"
      dataSource={list}
      onDrop={handleDrop}
      handle=".handle"
      chosenClass="chosen"
      className="virtual-list"
    >
      {
        (record, index, dataKey) => {
          return (
            <div className="list-item">
              <div className="item-title">
                <span className="index">#{ record.index }</span>
                <span className="handle">\u2630</span>
              </div>
              <p>{ record.desc }</p>
            </div>
          )
        }
      }
    </VirtualList>
  )
}

export default Virtual;`},react:{type:"NPM",value:"18.3.1"},"../global.less":{type:"FILE",value:e(34596).Z},"../public/sentence.ts":{type:"FILE",value:e(50850).Z}},entry:"index.jsx"},context:{"../global.less":I,"../public/sentence.ts":p,react:d||(d=e.t(m,2)),"/home/runner/work/react-virtual-drag-list/react-virtual-drag-list/dumi/docs/global.less":I,"/home/runner/work/react-virtual-drag-list/react-virtual-drag-list/dumi/docs/public/sentence.ts":p},renderOpts:{compile:function(){var g=E()(o()().mark(function _(){var s,u=arguments;return o()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(335).then(e.bind(e,37335));case 2:return r.abrupt("return",(s=r.sent).default.apply(s,u));case 3:case"end":return r.stop()}},_)}));function n(){return g.apply(this,arguments)}return n}()}}}},88858:function(c,a,e){var d;e.r(a),e.d(a,{demos:function(){return D}});var l=e(15009),o=e.n(l),P=e(5574),b=e.n(P),x=e(49677),O=e.n(x),M=e(99289),E=e.n(M),m=e(67294),A=e(76783),I=e(58940),p=e(20408),D={"docs-demo-group-demo-0":{component:m.memo(m.lazy(E()(o()().mark(function g(){var n,_,s,u,v,r;return o()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return r=function(){var j=n.useState(v(1e3,0)),i=b()(j,2),T=i[0],w=i[1],L=function(f){w(function(){return f.list})};return n.createElement(s,{dataKey:"id",dataSource:T,onDrop:L,group:"g",handle:".handle",chosenClass:"chosen",className:"virtual-list flex-1"},function(y,f,K){return n.createElement("div",{className:"list-item"},n.createElement("div",{className:"item-title"},n.createElement("span",{className:"index"},"#",y.index),n.createElement("span",{className:"handle"},"\u2630")))})},t.next=3,Promise.resolve().then(e.t.bind(e,67294,19));case 3:return n=t.sent,t.next=6,Promise.all([e.e(867),e.e(206)]).then(e.bind(e,62206));case 6:return _=t.sent,s=_.default,t.next=10,Promise.resolve().then(e.bind(e,20408));case 10:return u=t.sent,v=u.getPageData,t.t0=O(),t.next=15,Promise.resolve().then(e.bind(e,58940));case 15:return t.t1=t.sent,(0,t.t0)(t.t1),t.abrupt("return",{default:function(){return n.createElement("div",{className:"flex"},n.createElement(r,{key:"g1"}),n.createElement(r,{key:"g2"}))}});case 18:case"end":return t.stop()}},g)})))),asset:{type:"BLOCK",id:"docs-demo-group-demo-0",refAtomIds:[],dependencies:{"index.jsx":{type:"FILE",value:`import * as React from 'react';
import VirtualList from '@/index';
import { getPageData } from '../public/sentence';
import '../global.less';

function Virtual() {

  const [list, setList] = React.useState(getPageData(1000, 0));

  const handleDrop = (params) => {
    setList(() => params.list);
  }

  return (
    <VirtualList
      dataKey="id"
      dataSource={list}
      onDrop={handleDrop}
      group="g"
      handle=".handle"
      chosenClass="chosen"
      className="virtual-list flex-1"
    >
      {
        (record, index, dataKey) => {
          return (
            <div className="list-item">
              <div className="item-title">
                <span className="index">#{ record.index }</span>
                <span className="handle">\u2630</span>
              </div>
            </div>
          )
        }
      }
    </VirtualList>
  )
}

export default () => {
  return (
    <div className="flex">
      <Virtual key="g1"></Virtual>
      <Virtual key="g2"></Virtual>
    </div>
  )
};`},react:{type:"NPM",value:"18.3.1"},"../global.less":{type:"FILE",value:e(34596).Z},"../public/sentence.ts":{type:"FILE",value:e(50850).Z}},entry:"index.jsx"},context:{"../global.less":I,"../public/sentence.ts":p,react:d||(d=e.t(m,2)),"/home/runner/work/react-virtual-drag-list/react-virtual-drag-list/dumi/docs/global.less":I,"/home/runner/work/react-virtual-drag-list/react-virtual-drag-list/dumi/docs/public/sentence.ts":p},renderOpts:{compile:function(){var g=E()(o()().mark(function _(){var s,u=arguments;return o()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(335).then(e.bind(e,37335));case 2:return r.abrupt("return",(s=r.sent).default.apply(s,u));case 3:case"end":return r.stop()}},_)}));function n(){return g.apply(this,arguments)}return n}()}}}},39943:function(c,a,e){var d;e.r(a),e.d(a,{demos:function(){return D}});var l=e(15009),o=e.n(l),P=e(5574),b=e.n(P),x=e(49677),O=e.n(x),M=e(99289),E=e.n(M),m=e(67294),A=e(17991),I=e(58940),p=e(20408),D={"docs-demo-horizontal-demo-0":{component:m.memo(m.lazy(E()(o()().mark(function g(){var n,_,s,u,v,r;return o()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return r=function(){var j=n.useState(v(1e3,0)),i=b()(j,2),T=i[0],w=i[1],L=function(f){w(function(){return f.list})};return n.createElement(s,{dataKey:"id",dataSource:T,onDrop:L,handle:".handle",direction:"horizontal",chosenClass:"chosen",className:"horizontal-list",wrapStyle:{display:"flex"}},function(y,f,K){return n.createElement("div",{className:"list-item"},n.createElement("div",{className:"item-title"},n.createElement("span",{className:"index"},"#",y.index),n.createElement("span",{className:"handle"},"\u2630")),n.createElement("p",null,y.desc))})},t.next=3,Promise.resolve().then(e.t.bind(e,67294,19));case 3:return n=t.sent,t.next=6,Promise.all([e.e(867),e.e(206)]).then(e.bind(e,62206));case 6:return _=t.sent,s=_.default,t.next=10,Promise.resolve().then(e.bind(e,20408));case 10:return u=t.sent,v=u.getPageData,t.t0=O(),t.next=15,Promise.resolve().then(e.bind(e,58940));case 15:return t.t1=t.sent,(0,t.t0)(t.t1),t.abrupt("return",{default:r});case 18:case"end":return t.stop()}},g)})))),asset:{type:"BLOCK",id:"docs-demo-horizontal-demo-0",refAtomIds:[],dependencies:{"index.jsx":{type:"FILE",value:`import * as React from 'react';
import VirtualList from '@/index';
import { getPageData } from '../public/sentence';
import '../global.less';

function Virtual() {

  const [list, setList] = React.useState(getPageData(1000, 0));

  const handleDrop = (params) => {
    setList(() => params.list);
  }

  return (
    <VirtualList
      dataKey="id"
      dataSource={list}
      onDrop={handleDrop}
      handle=".handle"
      direction="horizontal"
      chosenClass="chosen"
      className="horizontal-list"
      wrapStyle={{ display: 'flex' }}
    >
      {
        (record, index, dataKey) => {
          return (
            <div className="list-item">
              <div className="item-title">
                <span className="index">#{ record.index }</span>
                <span className="handle">\u2630</span>
              </div>
              <p>{ record.desc }</p>
            </div>
          )
        }
      }
    </VirtualList>
  )
}

export default Virtual;`},react:{type:"NPM",value:"18.3.1"},"../global.less":{type:"FILE",value:e(34596).Z},"../public/sentence.ts":{type:"FILE",value:e(50850).Z}},entry:"index.jsx"},context:{"../global.less":I,"../public/sentence.ts":p,react:d||(d=e.t(m,2)),"/home/runner/work/react-virtual-drag-list/react-virtual-drag-list/dumi/docs/global.less":I,"/home/runner/work/react-virtual-drag-list/react-virtual-drag-list/dumi/docs/public/sentence.ts":p},renderOpts:{compile:function(){var g=E()(o()().mark(function _(){var s,u=arguments;return o()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(335).then(e.bind(e,37335));case 2:return r.abrupt("return",(s=r.sent).default.apply(s,u));case 3:case"end":return r.stop()}},_)}));function n(){return g.apply(this,arguments)}return n}()}}}},60754:function(c,a,e){var d;e.r(a),e.d(a,{demos:function(){return n}});var l=e(15009),o=e.n(l),P=e(19632),b=e.n(P),x=e(5574),O=e.n(x),M=e(49677),E=e.n(M),m=e(99289),A=e.n(m),I=e(67294),p=e(49528),D=e(58940),g=e(20408),n={"docs-demo-infinity-demo-0":{component:I.memo(I.lazy(A()(o()().mark(function _(){var s,u,v,r,R,t,h;return o()().wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return h=function(){var w=s.useState(R(50,0)),L=O()(w,2),y=L[0],f=L[1],K=function(){setTimeout(function(){f(function(B){return[].concat(b()(B),b()(R(10,B.length)))})},1e3)},W=function(B){f(function(){return B.list})};return s.createElement(v,{dataKey:"id",dataSource:y,onDrop:W,onBottom:K,footer:t(),handle:".handle",chosenClass:"chosen",className:"virtual-list"},function(C,B,U){return s.createElement("div",{className:"list-item"},s.createElement("div",{className:"item-title"},s.createElement("span",{className:"index"},"#",C.index),s.createElement("span",{className:"handle"},"\u2630")),s.createElement("p",null,C.desc))})},i.next=3,Promise.resolve().then(e.t.bind(e,67294,19));case 3:return s=i.sent,i.next=6,Promise.all([e.e(867),e.e(206)]).then(e.bind(e,62206));case 6:return u=i.sent,v=u.default,i.next=10,Promise.resolve().then(e.bind(e,20408));case 10:return r=i.sent,R=r.getPageData,i.t0=E(),i.next=15,Promise.resolve().then(e.bind(e,58940));case 15:return i.t1=i.sent,(0,i.t0)(i.t1),t=function(){return s.createElement("div",{className:"flex align-center justify-center",style:{height:"40px"}},s.createElement("div",{className:"loading"}))},i.abrupt("return",{default:h});case 19:case"end":return i.stop()}},_)})))),asset:{type:"BLOCK",id:"docs-demo-infinity-demo-0",refAtomIds:[],dependencies:{"index.jsx":{type:"FILE",value:`import * as React from 'react';
import VirtualList from '@/index';
import { getPageData } from '../public/sentence';
import '../global.less';

const Footer = () => {
  return (
    <div className="flex align-center justify-center" style={{ height: '40px' }}>
      <div className="loading"></div>
    </div>
  )
}

function Virtual() {

  const [list, setList] = React.useState(getPageData(50, 0));

  const handleToBottom = () => {
    setTimeout(() => {
      setList((oldlist) => [...oldlist, ...getPageData(10, oldlist.length)])
    }, 1000)
  }

  const handleDrop = (params) => {
    setList(() => params.list);
  }

  return (
    <VirtualList
      dataKey="id"
      dataSource={list}
      onDrop={handleDrop}
      onBottom={handleToBottom}
      footer={Footer()}
      handle=".handle"
      chosenClass="chosen"
      className="virtual-list"
    >
      {
        (record, index, dataKey) => {
          return (
            <div className="list-item">
              <div className="item-title">
                <span className="index">#{ record.index }</span>
                <span className="handle">\u2630</span>
              </div>
              <p>{ record.desc }</p>
            </div>
          )
        }
      }
    </VirtualList>
  )
}

export default Virtual;`},react:{type:"NPM",value:"18.3.1"},"../global.less":{type:"FILE",value:e(34596).Z},"../public/sentence.ts":{type:"FILE",value:e(50850).Z}},entry:"index.jsx"},context:{"../global.less":D,"../public/sentence.ts":g,react:d||(d=e.t(I,2)),"/home/runner/work/react-virtual-drag-list/react-virtual-drag-list/dumi/docs/global.less":D,"/home/runner/work/react-virtual-drag-list/react-virtual-drag-list/dumi/docs/public/sentence.ts":g},renderOpts:{compile:function(){var _=A()(o()().mark(function u(){var v,r=arguments;return o()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.e(335).then(e.bind(e,37335));case 2:return t.abrupt("return",(v=t.sent).default.apply(v,r));case 3:case"end":return t.stop()}},u)}));function s(){return _.apply(this,arguments)}return s}()}}}},73265:function(c,a,e){var d;e.r(a),e.d(a,{demos:function(){return D}});var l=e(15009),o=e.n(l),P=e(5574),b=e.n(P),x=e(49677),O=e.n(x),M=e(99289),E=e.n(M),m=e(67294),A=e(69216),I=e(20408),p=e(58940),D={"docs-demo-scroller-demo-0":{component:m.memo(m.lazy(E()(o()().mark(function g(){var n,_,s,u,v,r;return o()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return r=function(){var j=n.useState(v(100,0)),i=b()(j,2),T=i[0],w=i[1],L=function(f){w(function(){return f.list})};return n.createElement(s,{dataKey:"id",dataSource:T,onDrop:L,scroller:document,handle:".handle",chosenClass:"chosen"},function(y,f,K){return n.createElement("div",{className:"list-item"},n.createElement("div",{className:"item-title"},n.createElement("span",{className:"index"},"#",y.index),n.createElement("span",{className:"handle"},"\u2630")),n.createElement("p",null,y.desc))})},t.next=3,Promise.resolve().then(e.t.bind(e,67294,19));case 3:return n=t.sent,t.next=6,Promise.all([e.e(867),e.e(206)]).then(e.bind(e,62206));case 6:return _=t.sent,s=_.default,t.next=10,Promise.resolve().then(e.bind(e,20408));case 10:return u=t.sent,v=u.getPageData,t.t0=O(),t.next=15,Promise.resolve().then(e.bind(e,58940));case 15:return t.t1=t.sent,(0,t.t0)(t.t1),t.abrupt("return",{default:r});case 18:case"end":return t.stop()}},g)})))),asset:{type:"BLOCK",id:"docs-demo-scroller-demo-0",refAtomIds:[],dependencies:{"index.jsx":{type:"FILE",value:`import * as React from 'react';
import VirtualList from '@/index';
import { getPageData } from '../public/sentence';
import '../global.less';

function Virtual() {

  const [list, setList] = React.useState(getPageData(100, 0));

  const handleDrop = (params) => {
    setList(() => params.list);
  }

  return (
    <VirtualList
      dataKey="id"
      dataSource={list}
      onDrop={handleDrop}
      scroller={document}
      handle=".handle"
      chosenClass="chosen"
    >
      {
        (record, index, dataKey) => {
          return (
            <div className="list-item">
              <div className="item-title">
                <span className="index">#{ record.index }</span>
                <span className="handle">\u2630</span>
              </div>
              <p>{ record.desc }</p>
            </div>
          )
        }
      }
    </VirtualList>
  )
}

export default Virtual;`},react:{type:"NPM",value:"18.3.1"},"../public/sentence.ts":{type:"FILE",value:e(50850).Z},"../global.less":{type:"FILE",value:e(34596).Z}},entry:"index.jsx"},context:{"../public/sentence.ts":I,"../global.less":p,react:d||(d=e.t(m,2)),"/home/runner/work/react-virtual-drag-list/react-virtual-drag-list/dumi/docs/public/sentence.ts":I,"/home/runner/work/react-virtual-drag-list/react-virtual-drag-list/dumi/docs/global.less":p},renderOpts:{compile:function(){var g=E()(o()().mark(function _(){var s,u=arguments;return o()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(335).then(e.bind(e,37335));case 2:return r.abrupt("return",(s=r.sent).default.apply(s,u));case 3:case"end":return r.stop()}},_)}));function n(){return g.apply(this,arguments)}return n}()}}}},75910:function(c,a,e){var d;e.r(a),e.d(a,{demos:function(){return D}});var l=e(15009),o=e.n(l),P=e(5574),b=e.n(P),x=e(49677),O=e.n(x),M=e(99289),E=e.n(M),m=e(67294),A=e(70853),I=e(58940),p=e(20408),D={"docs-demo-table-demo-0":{component:m.memo(m.lazy(E()(o()().mark(function g(){var n,_,s,u,v,r,R;return o()().wrap(function(h){for(;;)switch(h.prev=h.next){case 0:return R=function(){var i=n.useState(v(1e3,0)),T=b()(i,2),w=T[0],L=T[1],y=function(K){L(function(){return K.list})};return n.createElement(s,{dataKey:"id",dataSource:w,onDrop:y,handle:".handle",tableMode:!0,header:r(),chosenClass:"chosen",className:"virtual-table"},function(f,K,W){return n.createElement("tr",null,n.createElement("td",null,n.createElement("span",{className:"index"},"#",f.index),n.createElement("span",{className:"handle"},"\u2630")),n.createElement("td",null,f.name),n.createElement("td",null,f.desc))})},h.next=3,Promise.resolve().then(e.t.bind(e,67294,19));case 3:return n=h.sent,h.next=6,Promise.all([e.e(867),e.e(206)]).then(e.bind(e,62206));case 6:return _=h.sent,s=_.default,h.next=10,Promise.resolve().then(e.bind(e,20408));case 10:return u=h.sent,v=u.getPageData,h.t0=O(),h.next=15,Promise.resolve().then(e.bind(e,58940));case 15:return h.t1=h.sent,(0,h.t0)(h.t1),r=function(){return n.createElement("thead",{style:{position:"sticky",top:0,zIndex:1}},n.createElement("tr",null,n.createElement("th",{style:{width:"15%"}},"index"),n.createElement("th",{style:{width:"25%"}},"name"),n.createElement("th",{style:{width:"60%"}},"content")))},h.abrupt("return",{default:R});case 19:case"end":return h.stop()}},g)})))),asset:{type:"BLOCK",id:"docs-demo-table-demo-0",refAtomIds:[],dependencies:{"index.jsx":{type:"FILE",value:`import * as React from 'react';
import VirtualList from '@/index';
import { getPageData } from '../public/sentence';
import '../global.less';

const Header = () => {
  return (
    <thead style={{ position: 'sticky', top: 0, zIndex: 1 }}>
      <tr>
        <th style={{ width: '15%' }}>index</th>
        <th style={{ width: '25%' }}>name</th>
        <th style={{ width: '60%' }}>content</th>
      </tr>
    </thead>
  )
}

function Virtual() {

  const [list, setList] = React.useState(getPageData(1000, 0));

  const handleDrop = (params) => {
    setList(() => params.list);
  }

  return (
    <VirtualList
      dataKey="id"
      dataSource={list}
      onDrop={handleDrop}
      handle=".handle"
      tableMode={true}
      header={Header()}
      chosenClass="chosen"
      className="virtual-table"
    >
      {
        (record, index, dataKey) => {
          return (
            <tr>
              <td>
                <span className="index">#{ record.index }</span>
                <span className="handle">\u2630</span>
              </td>
              <td>{ record.name }</td>
              <td>{ record.desc }</td>
            </tr>
          )
        }
      }
    </VirtualList>
  )
}

export default Virtual;`},react:{type:"NPM",value:"18.3.1"},"../global.less":{type:"FILE",value:e(34596).Z},"../public/sentence.ts":{type:"FILE",value:e(50850).Z}},entry:"index.jsx"},context:{"../global.less":I,"../public/sentence.ts":p,react:d||(d=e.t(m,2)),"/home/runner/work/react-virtual-drag-list/react-virtual-drag-list/dumi/docs/global.less":I,"/home/runner/work/react-virtual-drag-list/react-virtual-drag-list/dumi/docs/public/sentence.ts":p},renderOpts:{compile:function(){var g=E()(o()().mark(function _(){var s,u=arguments;return o()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.e(335).then(e.bind(e,37335));case 2:return r.abrupt("return",(s=r.sent).default.apply(s,u));case 3:case"end":return r.stop()}},_)}));function n(){return g.apply(this,arguments)}return n}()}}}},39548:function(c,a,e){e.r(a),e.d(a,{demos:function(){return o}});var d=e(67294),l=e(91906),o={}},88698:function(c,a,e){e.r(a),e.d(a,{demos:function(){return o}});var d=e(67294),l=e(66545),o={}},49014:function(c,a,e){e.r(a),e.d(a,{demos:function(){return o}});var d=e(67294),l=e(25790),o={}},78163:function(c,a,e){e.r(a),e.d(a,{demos:function(){return o}});var d=e(67294),l=e(92204),o={}},85316:function(c,a,e){e.r(a),e.d(a,{demos:function(){return o}});var d=e(67294),l=e(85285),o={}},20408:function(c,a,e){e.r(a),e.d(a,{getPageData:function(){return o}});var d=e(15623),l=e.n(d);function o(m,A){for(var I=[],p=0;p<m;p++){var D=A+p;I.push({index:D,name:l().Random.name(),id:b(D),desc:P()})}return I}function P(){for(var m=arguments.length>0&&arguments[0]!==void 0?arguments[0]:1,A=arguments.length>1&&arguments[1]!==void 0?arguments[1]:6,I=E[l().Random.pick([0,1,2])],p=[],D=l().Random.integer(m,A);D--;)p.push(l().Random.pick(I));return p.join(". ")+"."}function b(m){return"".concat(m,"$").concat(Math.random().toString(16).substr(9))}var x=["I messed up tonight I lost another fight","I still mess up but I'll just start again","I keep falling down I keep on hitting the ground","I always get up now to see what's next","Birds don't just fly they fall down and get up","Nobody learns without getting it won","I won't give up no I won't give in","Till I reach the end and then I'll start again","No I won't leave I wanna try everything","I wanna try even though I could fail","I won't give up no I won't give in","Till I reach the end and then I'll start again","No I won't leave I wanna try everything","I wanna try even though I could fail","Look at how far you've come you filled your heart with love","Baby you've done enough that cut your breath","Don't beat yourself up don't need to run so fast","Sometimes we come last but we did our best","I won't give up no I won't give in","Till I reach the end and then I'll start again","No I won't leave I wanna try everything","I wanna try even though I could fail","I won't give up no I won't give in","Till I reach the end and then I'll start again","No I won't leave I wanna try everything","I wanna try even though I could fail","I'll keep on making those new mistakes","I'll keep on making them every day","Those new mistakes"],O=["I will run I will climb I will soar","I'm undefeated","Jumping out of my skin pull the chord","Yeah I believe it","The past is everything we were don't make us who we are","So I'll dream until I make it real and all I see is stars","It's not until you fall that you fly","When your dreams come alive you're unstoppable","Take a shot chase the sun find the beautiful","We will glow in the dark turning dust to gold","And we'll dream it possible","And we'll dream it possible","I will chase I will reach I will fly","Until I'm breaking until I'm breaking","Out of my cage like a bird in the night","I know I'm changing I know I'm changing","In into something big better than before","And if it takes takes a thousand lives","Then it's worth fighting for","It's not until you fall that you fly","When your dreams come alive you're unstoppable","Take a shot chase the sun find the beautiful","We will glow in the dark turning dust to gold","And we'll dream it possible","It possible","From the bottom to the top","We're sparking wild fire's","Never quit and never stop","The rest of our lives","From the bottom to the top","We're sparking wild fire's","Never quit and never stop","It's not until you fall that you fly","When your dreams come alive you're unstoppable","Take a shot chase the sun find the beautiful","We will glow in the dark turning dust to gold","And we'll dream it possible","And we'll dream it possible"],M=["I can almost see it","That dream I'm dreamin' but","There's a voice inside my head saying","You'll never reach it","Every step I'm taking","Every move I make feels","Lost with no direction","My faith is shakin","But I I gotta keep tryin","Gotta keep my head held high","There's always gonna be another mountain","I'm always gonna wanna make it move","Always gonna be an uphill battle","Sometimes I'm gonna have to lose","Ain't about how fast I get there","Ain't about what's waitin on the other side","It's the climb","The struggles I'm facing","The chances I'm taking","Sometimes might knock me down but","No I'm not breaking","I may not know it","But these are the moments that","I'm gonna remember most yeah","Just gotta keep going","And I I gotta be strong","Just keep pushing on 'cause","There's always gonna be another mountain","I'm always gonna wanna make it move","Always gonna be an uphill battle","But Sometimes I'm gonna have to lose","Ain't about how fast I get there","Ain't about what's waitin on the other side","It's the climb","Yeah-yeah","There's always gonna be another mountain","I'm always gonna wanna make it move","Always gonna be an uphill battle","Sometimes you're gonna have to lose","Ain't about how fast I get there","Ain't about what's waitin on the other side","It's the climb","Yeah-yeah-yea","Keep on moving","Keep climbing","Keep the faith","Baby It's all about","It's all about the climb","Keep your faith","Whoa O Whoa"],E=[x,O,M]},58940:function(c,a,e){e.r(a)},66363:function(c,a,e){e.r(a),e.d(a,{texts:function(){return l}});var d=e(76395);const l=[]},7062:function(c,a,e){e.r(a),e.d(a,{texts:function(){return l}});var d=e(76783);const l=[]},16702:function(c,a,e){e.r(a),e.d(a,{texts:function(){return l}});var d=e(17991);const l=[]},15435:function(c,a,e){e.r(a),e.d(a,{texts:function(){return l}});var d=e(49528);const l=[]},22385:function(c,a,e){e.r(a),e.d(a,{texts:function(){return l}});var d=e(69216);const l=[]},91001:function(c,a,e){e.r(a),e.d(a,{texts:function(){return l}});var d=e(70853);const l=[]},4991:function(c,a,e){e.r(a),e.d(a,{texts:function(){return l}});var d=e(91906);const l=[{value:"onTop",paraId:0},{value:"scrolled to the top of list",paraId:1,tocIndex:0},{value:"onBottom",paraId:0},{value:"scrolled to the bottom of list",paraId:2,tocIndex:1},{value:"onDrag",paraId:0},{value:"drag is started",paraId:3,tocIndex:2},{value:`const {
  item,
  key,
  index,
  event,
} = dragEvent
`,paraId:4,tocIndex:2},{value:"onDrop",paraId:0},{value:"drag is completed",paraId:5,tocIndex:3},{value:`const {
  key,
  item,
  list,
  event,
  changed,
  oldList,
  oldIndex,
  newIndex,
} = dropEvent
`,paraId:6,tocIndex:3}]},15207:function(c,a,e){e.r(a),e.d(a,{texts:function(){return l}});var d=e(66545);const l=[{value:`$ npm i react-virtual-sortable
`,paraId:0},{value:`$ yarn add react-virtual-sortable
`,paraId:1},{value:`import VirtualList from 'react-virtual-sortable';

function Virtual() {

  const [list, setList] = useState([{id: '1', text: 'a'}, {id: '2', text: 'b'}, ...]);

  const onDrop = (event) => {
    // dnd complete
    setList(() => event.list);
  }

  // use style and className as jsx used
  return (
    <VirtualList
      style={{ height: '500px' }}
      dataKey="id"
      dataSource={ list }
      handle=".handle"
      onDrop={ onDrop }
    >
      {
        (record, index, dataKey) => {
          return (
            <div>
              <span className=".handle">{ index }</span>
              { record.text }
            </div>
          )
        }
      }
    </VirtualList>
  )
}
`,paraId:2,tocIndex:1}]},85939:function(c,a,e){e.r(a),e.d(a,{texts:function(){return l}});var d=e(25790);const l=[{value:"getSize(key)",paraId:0},{value:"Get the size of the current item by unique key value",paraId:1,tocIndex:0},{value:"getOffset()",paraId:0},{value:"Get the current scroll height",paraId:2,tocIndex:1},{value:"getClientSize()",paraId:0},{value:"Get wrapper element client viewport size (width or height)",paraId:3,tocIndex:2},{value:"getScrollSize()",paraId:0},{value:"Get all scroll size (scrollHeight or scrollWidth)",paraId:4,tocIndex:3},{value:"scrollToTop()",paraId:0},{value:"Scroll to top of list",paraId:5,tocIndex:4},{value:"scrollToBottom()",paraId:0},{value:"Scroll to bottom of list",paraId:6,tocIndex:5},{value:"scrollToKey(key)",paraId:0},{value:"Scroll to the specified ",paraId:7,tocIndex:6},{value:"data-key",paraId:7,tocIndex:6},{value:" position",paraId:7,tocIndex:6},{value:"scrollToIndex(index: number)",paraId:0},{value:"Scroll to the specified ",paraId:8,tocIndex:7},{value:"index",paraId:8,tocIndex:7},{value:" position",paraId:8,tocIndex:7},{value:"scrollToOffset(offset: number)",paraId:0},{value:"Scroll to the specified offset",paraId:9,tocIndex:8}]},63427:function(c,a,e){e.r(a),e.d(a,{texts:function(){return l}});var d=e(92204);const l=[{value:"dataSource",paraId:0},{value:"Type",paraId:1,tocIndex:0},{value:"Default",paraId:1,tocIndex:0},{value:"Required",paraId:1,tocIndex:0},{value:"Array",paraId:1,tocIndex:0},{value:"[]",paraId:1,tocIndex:0},{value:"true",paraId:1,tocIndex:0},{value:"The data that needs to be rendered",paraId:2,tocIndex:0},{value:"data-key",paraId:0},{value:"Type",paraId:3,tocIndex:1},{value:"Default",paraId:3,tocIndex:1},{value:"Required",paraId:3,tocIndex:1},{value:"String",paraId:3,tocIndex:1},{value:"-",paraId:3,tocIndex:1},{value:"true",paraId:3,tocIndex:1},{value:"The unique identifier of each piece of data, in the form of ",paraId:4,tocIndex:1},{value:"'a.b.c'",paraId:4,tocIndex:1},{value:"keeps",paraId:0},{value:"Type",paraId:5,tocIndex:2},{value:"Default",paraId:5,tocIndex:2},{value:"Number",paraId:5,tocIndex:2},{value:"30",paraId:5,tocIndex:2},{value:"The number of lines rendered by the virtual scroll",paraId:6,tocIndex:2},{value:"size",paraId:0},{value:"Type",paraId:7,tocIndex:3},{value:"Default",paraId:7,tocIndex:3},{value:"Number",paraId:7,tocIndex:3},{value:"0",paraId:7,tocIndex:3},{value:"The estimated height of each piece of data, you can choose to pass it or not, it will be automatically calculated",paraId:8,tocIndex:3},{value:"handle",paraId:0},{value:"Type",paraId:9,tocIndex:4},{value:"Default",paraId:9,tocIndex:4},{value:"String",paraId:9,tocIndex:4},{value:"-",paraId:9,tocIndex:4},{value:"Drag handle selector within list items",paraId:10,tocIndex:4},{value:"group",paraId:0},{value:"Type",paraId:11,tocIndex:5},{value:"Default",paraId:11,tocIndex:5},{value:"Object/String",paraId:11,tocIndex:5},{value:"-",paraId:11,tocIndex:5},{value:`string: 'name'
object: {
  name: 'group',
  put: true/false,
  pull: true/false/'clone',
  revertDrag: true/false
}
`,paraId:12,tocIndex:5},{value:"tableMode",paraId:0},{value:"Type",paraId:13,tocIndex:6},{value:"Default",paraId:13,tocIndex:6},{value:"Boolean",paraId:13,tocIndex:6},{value:"false",paraId:13,tocIndex:6},{value:"Display with table",paraId:14,tocIndex:6},{value:"keepOffset",paraId:0},{value:"Type",paraId:15,tocIndex:7},{value:"Default",paraId:15,tocIndex:7},{value:"Boolean",paraId:15,tocIndex:7},{value:"false",paraId:15,tocIndex:7},{value:"When scrolling up to load data, keep the same offset as the previous scroll",paraId:16,tocIndex:7},{value:"direction",paraId:0},{value:"Type",paraId:17,tocIndex:8},{value:"Default",paraId:17,tocIndex:8},{value:"vertical | horizontal",paraId:17,tocIndex:8},{value:"vertical",paraId:17,tocIndex:8},{value:"Virtual list scroll direction",paraId:18,tocIndex:8},{value:"scroller",paraId:0},{value:"Type",paraId:19,tocIndex:9},{value:"Default",paraId:19,tocIndex:9},{value:"Document | HTMLElement",paraId:19,tocIndex:9},{value:"Virtual list wrap",paraId:19,tocIndex:9},{value:"Virtual list scrolling element",paraId:20,tocIndex:9},{value:"lockAxis",paraId:0},{value:"Type",paraId:21,tocIndex:10},{value:"Default",paraId:21,tocIndex:10},{value:"x | y",paraId:21,tocIndex:10},{value:"-",paraId:21,tocIndex:10},{value:"Axis on which dragging will be locked",paraId:22,tocIndex:10},{value:"debounceTime",paraId:0},{value:"Type",paraId:23,tocIndex:11},{value:"Default",paraId:23,tocIndex:11},{value:"Number",paraId:23,tocIndex:11},{value:"0",paraId:23,tocIndex:11},{value:"debounce time on scroll",paraId:24,tocIndex:11},{value:"throttleTime",paraId:0},{value:"Type",paraId:25,tocIndex:12},{value:"Default",paraId:25,tocIndex:12},{value:"Number",paraId:25,tocIndex:12},{value:"0",paraId:25,tocIndex:12},{value:"throttle time on scroll",paraId:26,tocIndex:12},{value:"sortable",paraId:0},{value:"Type",paraId:27,tocIndex:13},{value:"Default",paraId:27,tocIndex:13},{value:"Boolean",paraId:27,tocIndex:13},{value:"true",paraId:27,tocIndex:13},{value:"Whether the current list can be sorted by dragging",paraId:28,tocIndex:13},{value:"disabled",paraId:0},{value:"Type",paraId:29,tocIndex:14},{value:"Default",paraId:29,tocIndex:14},{value:"Boolean",paraId:29,tocIndex:14},{value:"false",paraId:29,tocIndex:14},{value:"Disables the sortable if set to true",paraId:30,tocIndex:14},{value:"draggable",paraId:0},{value:"Type",paraId:31,tocIndex:15},{value:"Default",paraId:31,tocIndex:15},{value:"String",paraId:31,tocIndex:15},{value:'[role="item"]',paraId:31,tocIndex:15},{value:"Specifies which items inside the element should be draggable",paraId:32,tocIndex:15},{value:"animation",paraId:0},{value:"Type",paraId:33,tocIndex:16},{value:"Default",paraId:33,tocIndex:16},{value:"Number",paraId:33,tocIndex:16},{value:"150",paraId:33,tocIndex:16},{value:"Animation speed moving items when sorting",paraId:34,tocIndex:16},{value:"autoScroll",paraId:0},{value:"Type",paraId:35,tocIndex:17},{value:"Default",paraId:35,tocIndex:17},{value:"Boolean",paraId:35,tocIndex:17},{value:"true",paraId:35,tocIndex:17},{value:"Automatic scrolling when moving to the edge of the container",paraId:36,tocIndex:17},{value:"scrollSpeed",paraId:0},{value:"Type",paraId:37,tocIndex:18},{value:"Default",paraId:37,tocIndex:18},{value:"Object",paraId:37,tocIndex:18},{value:"{ x: 10, y: 10 }",paraId:37,tocIndex:18},{value:"Vertical&Horizontal scrolling speed (px)",paraId:38,tocIndex:18},{value:"scrollThreshold",paraId:0},{value:"Type",paraId:39,tocIndex:19},{value:"Default",paraId:39,tocIndex:19},{value:"Number",paraId:39,tocIndex:19},{value:"55",paraId:39,tocIndex:19},{value:"Threshold to trigger autoscroll",paraId:40,tocIndex:19},{value:"delay",paraId:0},{value:"Type",paraId:41,tocIndex:20},{value:"Default",paraId:41,tocIndex:20},{value:"Number",paraId:41,tocIndex:20},{value:"0",paraId:41,tocIndex:20},{value:"Time in milliseconds to define when the sorting should start",paraId:42,tocIndex:20},{value:"delayOnTouchOnly",paraId:0},{value:"Type",paraId:43,tocIndex:21},{value:"Default",paraId:43,tocIndex:21},{value:"Boolean",paraId:43,tocIndex:21},{value:"false",paraId:43,tocIndex:21},{value:"Only delay on press if user is using touch",paraId:44,tocIndex:21},{value:"fallbackOnBody",paraId:0},{value:"Type",paraId:45,tocIndex:22},{value:"Default",paraId:45,tocIndex:22},{value:"Boolean",paraId:45,tocIndex:22},{value:"false",paraId:45,tocIndex:22},{value:"Appends the ghost element into the document's body",paraId:46,tocIndex:22},{value:"rootTag",paraId:0},{value:"Type",paraId:47,tocIndex:23},{value:"Default",paraId:47,tocIndex:23},{value:"String",paraId:47,tocIndex:23},{value:"div",paraId:47,tocIndex:23},{value:"Label type for root element",paraId:48,tocIndex:23},{value:"wrapTag",paraId:0},{value:"Type",paraId:49,tocIndex:24},{value:"Default",paraId:49,tocIndex:24},{value:"String",paraId:49,tocIndex:24},{value:"div",paraId:49,tocIndex:24},{value:"Label type for wrap element",paraId:50,tocIndex:24},{value:"wrapClass",paraId:0},{value:"Type",paraId:51,tocIndex:25},{value:"Default",paraId:51,tocIndex:25},{value:"String",paraId:51,tocIndex:25},{value:"-",paraId:51,tocIndex:25},{value:"List wrapper element class",paraId:52,tocIndex:25},{value:"wrapStyle",paraId:0},{value:"Type",paraId:53,tocIndex:26},{value:"Default",paraId:53,tocIndex:26},{value:"Object",paraId:53,tocIndex:26},{value:"{}",paraId:53,tocIndex:26},{value:"List wrapper element style",paraId:54,tocIndex:26},{value:"ghostClass",paraId:0},{value:"Type",paraId:55,tocIndex:27},{value:"Default",paraId:55,tocIndex:27},{value:"String",paraId:55,tocIndex:27},{value:"-",paraId:55,tocIndex:27},{value:"The class of the mask element when dragging",paraId:56,tocIndex:27},{value:"ghostStyle",paraId:0},{value:"Type",paraId:57,tocIndex:28},{value:"Default",paraId:57,tocIndex:28},{value:"Object",paraId:57,tocIndex:28},{value:"{}",paraId:57,tocIndex:28},{value:"The style of the mask element when dragging",paraId:58,tocIndex:28},{value:"chosenClass",paraId:0},{value:"Type",paraId:59,tocIndex:29},{value:"Default",paraId:59,tocIndex:29},{value:"String",paraId:59,tocIndex:29},{value:"-",paraId:59,tocIndex:29},{value:"Class name for the chosen item",paraId:60,tocIndex:29},{value:"placeholderClass",paraId:0},{value:"Type",paraId:61,tocIndex:30},{value:"Default",paraId:61,tocIndex:30},{value:"String",paraId:61,tocIndex:30},{value:"-",paraId:61,tocIndex:30},{value:"Class name for the drop placeholder",paraId:62,tocIndex:30}]},4516:function(c,a,e){e.r(a),e.d(a,{texts:function(){return l}});var d=e(85285);const l=[]},34596:function(c,a){a.Z=`html {
  color: rgba(0, 0, 0, 0.65);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC",
    "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial,
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

tr {
  background-color: #ffffff;
  border-top: 1px solid #e2e2e3;
  transition: background-color .5s;
}

th {
  text-align: left;
  font-size: 14px;
  font-weight: 600;
  color: rgba(60, 60, 67, .78);
  background-color: #f6f6f7;
}

th,
td {
  border: 1px solid #e2e2e3;
  padding: 8px 16px;
}

.flex {
  display: flex;
}

.flex-1 {
  flex: 1;
}

.align-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}

.virtual-list {
  height: 500px;
  padding: 5px;
  font-size: 14px;
}

.horizontal-list {
  height: 500px;
  display: flex;
  padding: 5px;
}

.virtual-table {
  height: 500px;
  display: block;
  border-collapse: collapse;
  margin: 20px 0;
  overflow-x: auto;
}

.list-item {
  position: relative;
  border-radius: 5px;
  box-shadow: 0px 2px 10px -5px #57bbb4;
  padding: 16px;
}

.item-title {
  display: flex;
  justify-content: space-between;
}

.index {
  float: left;
}

.handle {
  cursor: grab;
  text-align: right;
}

.chosen {
  box-shadow: 0px 0px 0px 2px #306aa4;
}

.loading {
  position: relative;
  width: 30px;
  height: 30px;
  border: 2px solid #000;
  border-top-color: rgba(0, 0, 0, 0.2);
  border-right-color: rgba(0, 0, 0, 0.2);
  border-bottom-color: rgba(0, 0, 0, 0.2);
  border-radius: 100%;

  animation: circle infinite 0.75s linear;
}

@keyframes circle {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
`},50850:function(c,a){a.Z=`import Mock from 'mockjs';

export function getPageData(count, currentLength) {
  const DataItems = [];
  for (let i = 0; i < count; i++) {
    const index = currentLength + i;
    DataItems.push({
      index,
      name: Mock.Random.name(),
      id: getUniqueId(index),
      desc: getSentences(),
    });
  }
  return DataItems;
}

function getSentences(min = 1, max = 6) {
  const sentences = sentenceArray[Mock.Random.pick([0, 1, 2])];
  const results = [];

  let counts = Mock.Random.integer(min, max);
  while (counts--) {
    results.push(Mock.Random.pick(sentences));
  }
  return results.join('. ') + '.';
}

function getUniqueId(prefix) {
  return \`\${prefix}$\${Math.random().toString(16).substr(9)}\`;
}

// Try Everything (From Zootopia)
const sentence1 = [
  'I messed up tonight I lost another fight',
  "I still mess up but I'll just start again",
  'I keep falling down I keep on hitting the ground',
  "I always get up now to see what's next",
  "Birds don't just fly they fall down and get up",
  'Nobody learns without getting it won',
  "I won't give up no I won't give in",
  "Till I reach the end and then I'll start again",
  "No I won't leave I wanna try everything",
  'I wanna try even though I could fail',
  "I won't give up no I won't give in",
  "Till I reach the end and then I'll start again",
  "No I won't leave I wanna try everything",
  'I wanna try even though I could fail',
  "Look at how far you've come you filled your heart with love",
  "Baby you've done enough that cut your breath",
  "Don't beat yourself up don't need to run so fast",
  'Sometimes we come last but we did our best',
  "I won't give up no I won't give in",
  "Till I reach the end and then I'll start again",
  "No I won't leave I wanna try everything",
  'I wanna try even though I could fail',
  "I won't give up no I won't give in",
  "Till I reach the end and then I'll start again",
  "No I won't leave I wanna try everything",
  'I wanna try even though I could fail',
  "I'll keep on making those new mistakes",
  "I'll keep on making them every day",
  'Those new mistakes',
];

// Dream It Possible (From Delacey)
const sentence2 = [
  'I will run I will climb I will soar',
  "I'm undefeated",
  'Jumping out of my skin pull the chord',
  'Yeah I believe it',
  "The past is everything we were don't make us who we are",
  "So I'll dream until I make it real and all I see is stars",
  "It's not until you fall that you fly",
  "When your dreams come alive you're unstoppable",
  'Take a shot chase the sun find the beautiful',
  'We will glow in the dark turning dust to gold',
  "And we'll dream it possible",
  "And we'll dream it possible",
  'I will chase I will reach I will fly',
  "Until I'm breaking until I'm breaking",
  'Out of my cage like a bird in the night',
  "I know I'm changing I know I'm changing",
  'In into something big better than before',
  'And if it takes takes a thousand lives',
  "Then it's worth fighting for",
  "It's not until you fall that you fly",
  "When your dreams come alive you're unstoppable",
  'Take a shot chase the sun find the beautiful',
  'We will glow in the dark turning dust to gold',
  "And we'll dream it possible",
  'It possible',
  'From the bottom to the top',
  "We're sparking wild fire's",
  'Never quit and never stop',
  'The rest of our lives',
  'From the bottom to the top',
  "We're sparking wild fire's",
  'Never quit and never stop',
  "It's not until you fall that you fly",
  "When your dreams come alive you're unstoppable",
  'Take a shot chase the sun find the beautiful',
  'We will glow in the dark turning dust to gold',
  "And we'll dream it possible",
  "And we'll dream it possible",
];

// The Climb (From Miley Cyrus)
const sentence3 = [
  'I can almost see it',
  "That dream I'm dreamin' but",
  "There's a voice inside my head saying",
  "You'll never reach it",
  "Every step I'm taking",
  'Every move I make feels',
  'Lost with no direction',
  'My faith is shakin',
  'But I I gotta keep tryin',
  'Gotta keep my head held high',
  "There's always gonna be another mountain",
  "I'm always gonna wanna make it move",
  'Always gonna be an uphill battle',
  "Sometimes I'm gonna have to lose",
  "Ain't about how fast I get there",
  "Ain't about what's waitin on the other side",
  "It's the climb",
  "The struggles I'm facing",
  "The chances I'm taking",
  'Sometimes might knock me down but',
  "No I'm not breaking",
  'I may not know it',
  'But these are the moments that',
  "I'm gonna remember most yeah",
  'Just gotta keep going',
  'And I I gotta be strong',
  "Just keep pushing on 'cause",
  "There's always gonna be another mountain",
  "I'm always gonna wanna make it move",
  'Always gonna be an uphill battle',
  "But Sometimes I'm gonna have to lose",
  "Ain't about how fast I get there",
  "Ain't about what's waitin on the other side",
  "It's the climb",
  'Yeah-yeah',
  "There's always gonna be another mountain",
  "I'm always gonna wanna make it move",
  'Always gonna be an uphill battle',
  "Sometimes you're gonna have to lose",
  "Ain't about how fast I get there",
  "Ain't about what's waitin on the other side",
  "It's the climb",
  'Yeah-yeah-yea',
  'Keep on moving',
  'Keep climbing',
  'Keep the faith',
  "Baby It's all about",
  "It's all about the climb",
  'Keep your faith',
  'Whoa O Whoa',
];

const sentenceArray = [sentence1, sentence2, sentence3];
`}}]);
