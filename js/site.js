const worlds = {
  timeline:{title:'时间轨道',en:'STORY TRACK',kicker:'沿时间回到每一个重要瞬间',intro:'从高中同班，到确定关系，再到每一次旅行与普通日常。所有回忆会沿着时间轨道逐渐亮起。',highlights:[['2019','同一间教室'],['2024.10.30','确定关系'],['NOW','故事仍在继续']],notes:['支持照片、地点与双方视角','每段回忆都能成为独立星球','未来可按年份和主题筛选'],cards:['故事开始的地方','成为我们的第一天','下一段共同旅程']},
  map:{title:'我们的地图',en:'OUR WORLD',kicker:'把一起走过的地方连成新的大陆',intro:'城市、校园、餐厅、机场与海边都会在这里被点亮。以后每一次旅行，都会让这颗星球多一条发光路线。',highlights:[['HAIKOU','故事出发的地方'],['HONG KONG','新的生活坐标'],['NEXT','下一次旅行']],notes:['按国家、城市和地点聚合回忆','保存旅行路线和照片','统计共同走过的距离'],cards:['共同生活的坐标','一起看过的风景','还没有抵达的远方']},
  room:{title:'回忆房间',en:'MEMORY ROOM',kicker:'把纪念物与普通日子收藏成一个家',intro:'车票、礼物、照片、信件和玩偶都会成为房间中的可交互物品。这里不是相册，而是一处能走进去的共同空间。',highlights:[['DESK','机票与纪念品'],['WALL','照片与重要日期'],['WINDOW','共同的宇宙夜景']],notes:['点击物品打开对应回忆','未来支持真实 3D 房间','由两个人共同布置'],cards:['礼物与纪念物','照片墙','窗外的共同宇宙']},
  gallery:{title:'照片星河',en:'PHOTO GALAXY',kicker:'每一张照片，都是银河里留下的一束光',intro:'照片会按照旅行、日常、搞怪和双方视角形成不同星云。靠近一张照片，就能重新进入那一天。',highlights:[['DAILY','普通但幸福'],['TRAVEL','一起看过的世界'],['PORTRAIT','我镜头里的你']],notes:['支持照片和短视频','按人物、地点和日期筛选','每张照片关联完整故事'],cards:['普通但幸福的瞬间','一起看过的世界','我镜头里的你']},
  diary:{title:'双人日记',en:'TWIN DIARIES',kicker:'同一天，两种视角',intro:'葛家羽和牛一铭可以分别记录同一天。两篇日记并排出现，保留当时不同却相互靠近的感受。',highlights:[['JIAYU','葛家羽的视角'],['YIMING','牛一铭的视角'],['TOGETHER','共同篇章']],notes:['支持立即公开或指定日期解锁','关联照片、音乐与回忆','保留仅自己可见的内容'],cards:['葛家羽写下的今天','牛一铭写下的今天','我们共同完成的篇章']},
  letters:{title:'写给未来',en:'FUTURE LETTERS',kicker:'把今天的话交给未来',intro:'写给半年后、一周年、毕业时或更远未来的我们。信件在设定日期之前保持封存，到那一天才真正被打开。',highlights:[['6 MONTHS','半年后的我们'],['ANNIVERSARY','下个纪念日'],['FUTURE','更远的以后']],notes:['支持倒计时与纪念日解锁','可以附加照片和音乐','开启时触发专属仪式'],cards:['写给半年后','写给下个纪念日','写给更远的以后']},
  stats:{title:'恋爱数据',en:'OUR NUMBERS',kicker:'把共同生活变成会持续增长的数据',intro:'在一起的天数、见面次数、旅行距离、照片数量和共同完成的愿望，会随着时间不断增加。',highlights:[['DAY','在一起的每一天'],['PLACES','共同去过的地方'],['MEMORIES','不断增加的回忆']],notes:['数据由各模块自动聚合','支持年度回顾','保留有趣而克制的统计'],cards:['一起度过的日子','共同到过的地方','持续增加的回忆']},
  wishes:{title:'愿望星座',en:'WISH CONSTELLATION',kicker:'每完成一个愿望，就点亮一颗星',intro:'一起看日出、去新的城市、拍一套正式合照，或完成更远的计划。愿望会连接成只属于我们的星座。',highlights:[['DONE','已经共同完成'],['NOW','正在靠近'],['SOMEDAY','未来会实现']],notes:['支持完成动画和成就徽章','每个愿望关联照片与日期','星座随关系继续生长'],cards:['已经实现的愿望','正在靠近的目标','未来会抵达的远方']},
  signal:{title:'我们的通讯星',en:'OUR SIGNAL',kicker:'把舍不得删的聊天重新收藏',intro:'这里只展示经过挑选的聊天片段，而不是复制整个微信。重要文字、语音和照片会成为回忆之间的通信信号。',highlights:[['FIRST','最初的聊天'],['FUNNY','只有我们懂的玩笑'],['LATE NIGHT','深夜的话题']],notes:['使用本站自己的聊天视觉','支持关联具体回忆','敏感内容遵循三层权限'],cards:['最初的聊天','只有我们懂的玩笑','深夜舍不得结束的话题']}
};

const planetAssets={
  timeline:'planet-timeline.png',map:'planet-map.png',room:'planet-room.png',gallery:'planet-gallery.png',
  diary:'planet-diary.png',letters:'planet-letters.png',stats:'planet-stats.png',wishes:'planet-wishes.png',signal:'planet-signal.png'
};

function dayCount(){
  const start=new Date('2024-10-30T00:00:00+08:00');
  const now=new Date();
  const today=new Date(now.getFullYear(),now.getMonth(),now.getDate());
  return Math.max(1,Math.floor((today-start)/86400000)+1);
}

function renderWorld(id){
  const world=worlds[id]; if(!world)return;
  document.querySelectorAll('[data-world]').forEach(el=>el.classList.toggle('is-active',el.dataset.world===id));
  const set=(selector,value)=>{const el=document.querySelector(selector);if(el)el.textContent=value};
  set('[data-world-title]',world.title);set('[data-world-en]',world.en);set('[data-world-kicker]',world.kicker);set('[data-world-intro]',world.intro);
  const timeline=document.querySelector('[data-world-highlights]');
  if(timeline)timeline.innerHTML=world.highlights.map(([date,title])=>`<div><time>${date}</time><i></i><span>${title}</span></div>`).join('');
  const notes=document.querySelector('[data-world-notes]');
  if(notes)notes.innerHTML=world.notes.map(note=>`<p>${note}</p>`).join('');
  const gallery=document.querySelector('[data-world-gallery]');
  if(gallery){const visuals=[planetAssets[id],'galaxy-atlas.png','hero-twin-planets.png'];gallery.innerHTML=world.cards.map((card,index)=>`<article class="memory-card" style="background-image:linear-gradient(0deg,rgba(9,13,39,.84),transparent),url('assets/${visuals[index]}')"><small>ARCHIVE · 0${index+1}</small><span>${card}</span></article>`).join('')}
  document.body.dataset.selectedWorld=id;
}

function showTimelineMemory(){
  const memory=document.querySelector('[data-timeline-memory]');
  if(!memory)return false;
  document.body.classList.add('timeline-world');
  document.querySelector('[data-generic-world]')?.setAttribute('hidden','');
  document.querySelector('.world-arrival__sky')?.setAttribute('hidden','');
  memory.removeAttribute('hidden');
  document.title='小圆｜时间轨道｜OUR ORBIT';
  return true;
}

document.addEventListener('DOMContentLoaded',()=>{
  const days=dayCount();
  document.querySelectorAll('[data-day-count]').forEach(el=>el.textContent=`DAY ${days}`);
  document.querySelectorAll('[data-day-number]').forEach(el=>el.textContent=days);
  requestAnimationFrame(()=>document.body.classList.add('is-ready'));
  const isAtlas=document.body.classList.contains('universe-page');
  const exitWorld=()=>{const stage=document.querySelector('.galaxy-stage');const overlay=document.querySelector('[data-flight-overlay]');if(!stage||!overlay)return;stage.classList.remove('is-entering');overlay.classList.remove('is-visible','is-arrived');stage.style.removeProperty('--jump-x');stage.style.removeProperty('--jump-y');stage.style.removeProperty('--fly-x');stage.style.removeProperty('--fly-y');stage.style.removeProperty('--flight-color')};
  const enterWorld=(id)=>{const stage=document.querySelector('.galaxy-stage');const overlay=document.querySelector('[data-flight-overlay]');if(!stage||!overlay||stage.classList.contains('is-entering'))return;const focus={timeline:[.226,.659],map:[.600,.798],room:[.857,.599],gallery:[.800,.343],diary:[.245,.294],letters:[.457,.216],stats:[.912,.221],wishes:[.111,.147],signal:[.650,.288]}[id]||[.5,.5];const color={timeline:'#7588e8',map:'#77b7d9',room:'#d78359',gallery:'#d5e7ff',diary:'#b78bbb',letters:'#f1bd7c',stats:'#b57c5b',wishes:'#d9d3bc',signal:'#63c8be'}[id]||'#cfc6f4';const scale=5.1;stage.style.setProperty('--jump-x',`${focus[0]*100}%`);stage.style.setProperty('--jump-y',`${focus[1]*100}%`);stage.style.setProperty('--fly-x',`${50-focus[0]*scale*100}%`);stage.style.setProperty('--fly-y',`${50-focus[1]*scale*100}%`);stage.style.setProperty('--flight-color',color);overlay.style.setProperty('--flight-color',color);overlay.querySelector('[data-flight-en]').textContent=worlds[id].en;overlay.querySelector('[data-flight-title]').textContent=worlds[id].title;overlay.querySelector('[data-flight-kicker]').textContent=worlds[id].kicker;stage.classList.add('is-entering');window.setTimeout(()=>overlay.classList.add('is-visible'),3040);window.setTimeout(()=>window.location.assign(`world.html?world=${encodeURIComponent(id)}`),3660)};
  if(isAtlas)window.addEventListener('popstate',exitWorld);
  document.querySelectorAll('[data-world]').forEach(button=>button.addEventListener('click',()=>{if(isAtlas){enterWorld(button.dataset.world)}else{renderWorld(button.dataset.world);document.querySelector('[data-world-nav]')?.classList.remove('is-open')}}));
  document.querySelector('[data-menu-button]')?.addEventListener('click',()=>document.querySelector('[data-world-nav]')?.classList.toggle('is-open'));
  document.querySelectorAll('.detail-tabs button').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('.detail-tabs button').forEach(item=>item.classList.remove('is-active'));button.classList.add('is-active')}));
  if(document.querySelector('[data-world-title]')){const requested=new URLSearchParams(window.location.search).get('world');const id=requested&&worlds[requested]?requested:'timeline';if(id==='timeline'&&showTimelineMemory()){renderWorld(id)}else{renderWorld(id)}}
  if(window.matchMedia('(pointer:fine)').matches){
    const image=document.querySelector('.home-scene__image');
    window.addEventListener('mousemove',event=>{if(!image)return;const x=(event.clientX/window.innerWidth-.5)*8;const y=(event.clientY/window.innerHeight-.5)*5;image.style.setProperty('--mouse-x',`${x}px`);image.style.setProperty('--mouse-y',`${y}px`)},{passive:true});
  }
});
