(function(){
	var iptDoms = dom('ipt');//取得所有输入框节点
	var ipt_ms = dom('ipt-ms');//取得所有输入框下方节点
	var ipt_ms_bg = dom('ipt-ms-bg');//取得所有输入框下方图标节点
	var ipt_right = dom('ipt-right');//取得所有。。。右边图标节点
	for(var i=0;i<iptDoms.length;i++){
		iptDoms[i].index = i;
		iptDoms[i].onfocus = function(){
			var phd = this.placeholder;
			this.placeholder = " ";
			this.style.color = '#333';
			if(this.index<5)
			ipt_ms[this.index].style.display = 'block'; 
			this.onkeyup= function(){
				switch(this.index){
					case 0:Reg(this.value,this.index);
						break;
					case 1:regMm(this.value,this.index);
					    break;
					case 2:isMm(iptDoms[this.index],iptDoms[this.index-1],this.index);
					    break;
					case 3:phYz(this.value,this.index);
					    break;
					default:break;
				}	
			}
			this.onblur = function(){
				this.placeholder = phd;
				this.style.color = '#ddd';
				if(this.index<5)
				ipt_ms[this.index].style.display = 'none';
			}
		}
	}
	//获取随机数
	var yzSpan = document.getElementsByClassName('iptS-R-i')[0];
	yzSpan.innerHTML = randomString();
	yzSpan.onclick = function(){
		this.innerHTML = randomString();
	}
	//随机获取字符串
	function randomString() {   
		var $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';  
		var maxPos = $chars.length;  
		var pwd = '';  
		for (i = 0; i < 6; i++) {    
		   pwd += $chars.charAt(Math.floor(Math.random() * (maxPos+1)));  
		}  
		return pwd;  
	} 
	//输入框右上角图标控制
	function iptRight(index,str){
		ipt_right[index].style.display = str;
	}
	//获取节点对象
	function dom(str){
		return document.getElementById(str)||document.getElementsByClassName(str);
	}
	//验证用户名输入框
	function Reg(str,index){
		var isS = new RegExp('^[\u4e00-\u9fa5aa-zA-Z\-_0-9]{4,20}$');
		if(isS.test(str)){
		    iptRight(index,'block');
		}else{
			iptRight(index,'none');
		}
	}
	//密码框验证
	function regMm(str,index){
		var inner = '建议使用字母、数字和符号两种及以上的组合，6-20个字符';
		var mmR = '有被盗风险,建议使用字母、数字和符号两种及以上组合';
		var mmZ = '安全强度适中，可以使用三种以上的组合来提高安全强度';
		var mmQ = '你的密码很安全';
		if(str.length<=5){
			cgSpan(index,inner,0,-100,'#ddd');
			iptRight(index,'none');
		}
		if(new RegExp('^[a-zA-Z]+[0-9]*$').test(str)){
			if(str.length>5&&str.length<10){
				cgSpan(index,mmZ,-34,-117,'#ddd');
				iptRight(index,'block');
			}
			if(str.length>10){
				cgSpan(index,mmQ,-34,-134,'#ddd');
				iptRight(index,'block');
			}
		}
		if(new RegExp('^[0-9]+$').test(str)){
			if(str.length>5&&str.length<10){
				cgSpan(index,mmR,-17,-134,'red');	
			}
			if(str.length>10){
				cgSpan(index,mmZ,-34,-117,'#ddd');
				iptRight(index,'block');
			}
		}	
	}
	//改变输入框下方图标和文字
	function cgSpan(index,str,x,y,cr){
		var childSpan = ipt_ms[index].getElementsByTagName('span')[0];
	    var childI = ipt_ms[index].getElementsByTagName('i')[0];
		childSpan.innerHTML = str;
		childSpan.style.color = cr;
		childI.style.backgroundPositionX = x+'px';
		childI.style.backgroundPositionY = y+'px';
	}
	//检查密码是否相等
	function isMm(dom1,dom2,index){
		var spanF = '两次输入不一致';
		var spanT = '请再次输入密码';
		if(dom1.value==dom2.value){
			iptRight(index,'block');
			cgSpan(index,spanT,0,-100,'#ddd');
		}else{
	        iptRight(index,'none');
	        cgSpan(index,spanF,-17,-100,'red');
		}
		
	}
	//手机号输入框验证
	function phYz(value,index){
		var spanF = '格式不正确!';
		var spanT = '请输入手机号';
		if(new RegExp('^1[34578][0-9]{9}$').test(value)){
			iptRight(index,'block');
			cgSpan(index,spanT,0,-100,'#ddd');
		}else{
			iptRight(index,'none');
	        cgSpan(index,spanF,-17,-100,'red');
		}
	}
	//验证手机验证码
	var shYz = dom('hqYZ');
	shYz.onclick = function(){
		if(iptDoms[3].value!=""){
			if(iptDoms[4].value!=""){
				if(iptDoms[4].value==yzSpan.innerHTML){
					alert('短信已发出!');
				}else{
					var str2 = '验证码错误';
					ipt_ms[4].style.display = 'block';
					cgSpan(4,str2,-17,-100,'red');
				}
			}else{
				var str1 = '请输入验证码！';
				ipt_ms[4].style.display = 'block'
				cgSpan(4,str1,-17,-100,'red');
			}
		}else{
            ipt_ms[3].style.display = 'block';
			var str = '请输入手机号！';
			cgSpan(3,str,-17,-100,'red');
		}
	}
	//验证是否为空是否注册
	var bTn = dom('btnS');
	bTn[0].onclick = function(){
		var isZc = 0;
		for(var i=0;i<ipt_right.length;i++){
			if(ipt_right[i].style.display=='block'){
				isZc++;
			}
		}
		if(isZc==4){
			alert('注册成功！');
		}else{
			alert('请填写完整！');
		}
	}
})();