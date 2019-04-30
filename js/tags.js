(function(){
	// constructor function
	var TagsInput = function(opts){
		this.arr = [];
		this.input   = document.createElement('input');
		this.wrapper = document.createElement('div');
		this.options = Object.assign(TagsInput.default, opts);  
		this.original_input = document.getElementById(opts.selector);
		buildUI(this);
		addEvents(this);
	}
	
	TagsInput.prototype.addTag = function(string){
		// If any error then returns without doing anything
		if(this.anyErrors(string))
				return ;
			
		// push the string into array
		this.arr.push(string);
		var tagInput = this ;
		
		// create Dom element for tag	
		var tag = document.createElement('span');
			tag.className = this.options.tagClass ;
			tag.innerText = string ;
		
		var closeIcon = document.createElement('a');
			closeIcon.innerHTML = '&times;';
			// add eventlister to close button
		closeIcon.addEventListener('click',function(e){
			e.preventDefault();
			var tag = this.parentNode;
			
			for(var i= 0; i< tagInput.wrapper.childNodes.length ; i++){
				if(tagInput.wrapper.childNodes[i] == tag){
					tagInput.deleteTag(tag, i);
				}
			}
			
		});
		
		tag.appendChild(closeIcon);
		this.wrapper.insertBefore(tag , this.input);
        this.original_input.value = this.arr.join(',');		
		return this ;	
			
	}
	
	TagsInput.prototype.deleteTag = function(tag, i){
		tag.remove();
		this.arr.splice(i, 1);
		this.original_input.value  = this.arr.join(',');
		return this ;	
	}
	
	TagsInput.prototype.addData = function(array){
        var plugin = this;
        
        array.forEach(function(string){
            plugin.addTag(string);
        })
        return this;
    }

    TagsInput.prototype.getInputString = function(){
        return this.arr.join(',');
    }
	
	TagsInput.prototype.anyErrors = function(string){
		if(this.options.max != null && this.arr.length> this.options.max){
			 console.log("Max limit reached");
			 return true ;
		}
		return false ; 
	}
	
	function buildUI(tags){
		tags.wrapper.append(tags.input);
		tags.wrapper.classList.add(tags.options.wrapperClass);	
		tags.original_input.setAttribute('hidden','true');
		tags.original_input.parentNode.insertBefore(tags.wrapper, tags.original_input);
		
	}
	
	function addEvents(tags){
		tags.wrapper.addEventListener('click', function(){
			tags.input.focus();
		});

		tags.input.addEventListener('keydown',function(e){
			var str = tags.input.value.trim();
			if( !!(~[9 , 13 , 188].indexOf( e.keyCode ))  )
            {
				tags.input.value = "" ;
				if(str != "")
					tags.addTag(str);
			}
		});	
	
	}	
	// Attach our defaults for plugin to the plugin itself
	TagsInput.default = {
		selector : '',
		max: null,
		duplicate: false,
		wrapperClass: 'tags-input-wrapper',
		tagClass: 'tag'	
	}
	
	// make accessible globally
	window.TagsInput = TagsInput ;
})();