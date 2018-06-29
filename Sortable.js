var DortableJS = new function() {
	var dragObject = {};
	var self = this;
	var hn = document.createElement('div');
	hn.className = "boxi"

	function onMouseDown(e) {
		var spisok = document.getElementsByClassName("box")
		if (e.which != 1) return;
		var elem = e.target.closest('.box');
		if (!elem) return;
		if (elem == document.elementFromPoint(event.clientX, event.clientY)) {
			for (var i = 0; i < spisok.length; i++) {
				var div1 = document.createElement('div');
				div1.className = "box1";
				var div2 = document.createElement('div');
				div2.className = "box2";
				spisok[i].appendChild(div1)
				spisok[i].appendChild(div2)
			}
		}
		dragObject.elem = elem;
		dragObject.downX = e.pageX;
		dragObject.downY = e.pageY;
		return false;
	}

	function onMouseMove(e) {
		if (!dragObject.elem) return;
		if (!dragObject.avatar) {
			var moveX = e.pageX - dragObject.downX;
			var moveY = e.pageY - dragObject.downY;
			if (Math.abs(moveX) < 5 && Math.abs(moveY) < 5) {
				return;
			}
			dragObject.avatar = createAvatar(e);
			if (!dragObject.avatar) {
				dragObject = {};
				return;
			}
			var coords = getCoords(dragObject.avatar);
			dragObject.shiftX = dragObject.downX - coords.left;
			dragObject.shiftY = dragObject.downY - coords.top;
			startDrag(e);
		}
		dragObject.avatar.style.left = e.pageX - dragObject.shiftX + 'px';
		dragObject.avatar.style.top = e.pageY - dragObject.shiftY + 'px';
		dragObject.avatar.hidden = true;
		var elem = document.elementFromPoint(event.clientX, event.clientY);
		dragObject.avatar.hidden = false;
		if (elem == elem.closest('.box1')) {
			vstavka(event)
		}
		if (elem == elem.closest('.box2')) {
			vstavka2(event)
		}
		return false;
	}

	function onMouseUp(e) {
		if (dragObject.avatar) {
			finishDrag(e)
			var spisok = document.getElementsByClassName("box")
			for (var i = 0; i < spisok.length; i++) {
				var gg = spisok[i].getElementsByClassName("box1")
				var ggg = spisok[i].getElementsByClassName("box2")
				spisok[i].removeChild(gg[0])
				spisok[i].removeChild(ggg[0])
			}
		}
		dragObject = {};
	}

	function finishDrag(e) {
		var dropElem = findDroppable(e);
		if (!dropElem) {
			self.onDragCancel(dragObject);
		} else {
			self.onDragEnd(dragObject, dropElem);
		}
	}

	function createAvatar(e) {
		var avatar = dragObject.elem;
		var old = {
			parent: avatar.parentNode,
			position: avatar.position || '',
			left: avatar.left || '',
			top: avatar.top || '',
			zIndex: avatar.zIndex || ''
		};
		avatar.rollback = function() {
			var elem = hn
			old.parent.replaceChild(avatar, elem);
			avatar.style.position = old.position;
			avatar.style.left = old.left;
			avatar.style.top = old.top;
			avatar.style.zIndex = old.zIndex
		};
		return avatar;
	}

	function startDrag(e) {
		var avatar = dragObject.avatar;
		avatar.style.zIndex = 9999;
		avatar.style.position = 'absolute';
		avatar.style.width = columns.offsetWidth + 'px';
		var elem = document.elementFromPoint(event.clientX, event.clientY);
		columns.insertBefore(hn, document.elementFromPoint(event.clientX, event.clientY).parentElement)
	}

	function vstavka(event) {
		dragObject.avatar.hidden = true;
		var elem = document.elementFromPoint(event.clientX, event.clientY);
		columns.insertBefore(hn, document.elementFromPoint(event.clientX, event.clientY).parentElement)
		dragObject.avatar.hidden = false;
		if (elem == null) {
			return null;
		}
	}

	function vstavka2(event) {
		dragObject.avatar.hidden = true;
		var elem = document.elementFromPoint(event.clientX, event.clientY).parentElement;
		dragObject.avatar.hidden = false;
		return elem.parentNode.insertBefore(hn, elem.nextSibling);
		if (elem == null) {
			return null;
		}
	}

	function findDroppable(event) {
		dragObject.avatar.hidden = true;
		var elem = document.elementFromPoint(event.clientX, event.clientY);
		dragObject.avatar.hidden = false;
		if (elem == null) {
			return null;
		}
		return elem.closest('.box');
	}
	document.onmousemove = onMouseMove;
	document.onmouseup = onMouseUp;
	document.onmousedown = onMouseDown;
	this.onDragCancel = function() {
		dragObject.avatar.rollback();
	}
	this.onDragEnd = function() {
		dragObject.avatar.rollback();
	}
};

function getCoords(elem) {
	var box = elem.getBoundingClientRect();
	return {
		top: box.top + pageYOffset,
		left: box.left + pageXOffset
	};
}