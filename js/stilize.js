NodeList.prototype.forEach = Array.prototype.forEach; 
HTMLCollection.prototype.forEach = Array.prototype.forEach;

document.addEventListener('DOMContentLoaded', function(e) {
	
	jQuery('select.ss').select2({
		allowClear: true,
		placeholder: 'Faça sua busca aqui',
		theme: "classic"
	});
	
	/** @auth Matheus, Fernando e João
	 * MOSTRAR E ESCONDER MODAL AO CLICAR UMA OU DUAS VEZES NOS SELETORES ABAIXO
	 */
	document.querySelectorAll('[data-toggle=modal], div.bg-modal').forEach(function($e, i, n) {
		$e.ondblclick = function(event) {
			return openBox($e);
		};			
		$e.onclick = function(event) {
			if ($e.nodeName.toLowerCase() == 'input')
				return true;
			return openBox($e);
		}
	});
	
});

jQuery(document).ready(function () {
	/** @auth Matheus
	 * ADICIONAR MODAL EM TODAS AS PAGINAS
	 */
	jQuery('body').append('<div class="bg-modal"><div class="modal"><iframe id="iframe-modal"></iframe></div></div>');
	
	/** @auth Matheus
	 * ESCONDER ELEMENTOS DEPOIS DE 3 SEGUNDOS
	 */
	if(!jQuery('.time-out').is(':empty')) {
		setTimeout(function () {
           jQuery('.time-out').toggle(); 
        }, 3000);
    }
	
	/** @auth Matheus
	 *  INICIO TABS
	 */
	jQuery('li.active a').each(function() {
		var idActive = $(this).attr('href').replace('#', '');
		jQuery('div#' + idActive).fadeIn();
	});
	jQuery('ul[class^=tab] a').click(function(e) {
        e.preventDefault();
        if($(this).closest('li').attr('class') == 'active') {
        	return;
        } else {             
          jQuery('.tab-group').find('[id^=content]').attr({'aria-expanded' : 'false', 'aria-hidden' : 'true'}).hide();
          jQuery('ul[class^=tab] li').removeAttr('class').attr('aria-selected', 'false');
          $(this).parent().addClass('active').attr('aria-selected', 'true');
          jQuery('#content-' + $(this).attr('id')).attr({'aria-expanded' : 'true', 'aria-hidden' : 'false'}).fadeIn();
        }
    });
	/**
	 * FIM TABS
	 */
	
	/** @auth Matheus
	 * SETANDO LI ATIVO DE ACORDO COM URL
	 */
//	jQuery('li[id=' + getFinal() + ']').addClass('active');
	
	
	/** @auth Matheus
	 * REALIZANDO SLIDE NO MENU
	 */
	jQuery('[data-slide=true]').click(function() {
		if (jQuery(this).find('span').hasClass('icon-circle-arrow-down')) {
			jQuery(this).find('span').removeClass('icon-circle-arrow-down').addClass('icon-circle-arrow-up');
			jQuery(jQuery(this).attr('href')).slideDown(500);
		} else {
			jQuery(this).find('span').removeClass('icon-circle-arrow-up').addClass('icon-circle-arrow-down');
			jQuery(jQuery(this).attr('href')).slideUp(500);
		}
	})
	
	/** @auth Matheus
	 *  EXECUTANDO FUNCAO PARA STICKY FOOTER
	 */
	stickyFooter();
	
	/** @auth Matheus
	 *  FUNCAO PARA MOSTRAR E ESCONDER COLLAPSE EM EFEITO SLIDE
	 */
	jQuery('[data-toggle=collapse]').click(function() {
		event.preventDefault();
		jQuery($(this).attr('href')).slideToggle();
	});
	
	/** @auth Matheus
	 *  FUNCAO PARA MOSTRAR E ESCONDER DIVS DO CADASTRO PASSO-A-PASSO
	 */
	jQuery('button[data-current][data-next]').click(function() {
		jQuery('.' + $(this).data('current')).toggle();
		jQuery('.' + $(this).data('next')).toggle();
	});
	
});

/** @auth Matheus, Fernando e João
 * ABRIR E FECHAR OPENBOX
 */
function openBox($obj) {
	if (($obj.href || $obj.formAction) != undefined)
		jQuery('iframe').attr('src', ($obj.href || $obj.formAction));
	jQuery('div.bg-modal').fadeToggle(300);
	jQuery('div.modal').fadeToggle(300);
	return false;
}

/** @auth Matheus
 * MOSTRAR OU ESCONDER ELEMENTO INFORMADO NOS PARAMETROS
 */
function toggleElement(element, type, parametro) {
	for(var i = 0; i < element.length; i++) {
		if (type[i] == 'class') {
			jQuery(element[i] + '.' + parametro[i]).fadeToggle(300);
		} else if (type[i] == 'id') {
			jQuery(element[i] + '#' + parametro[i]).fadeToggle(300);
		} else if (type[i].match('^data')) {
			jQuery(element[i] + '['+ type[i] + '=' + parametro[i] + ']').fadeToggle(300);
		}
	}
}

/** @auth Matheus
 * IDENTIFICAR URL PARA ATIVAR LI
 */
function identityUrl() {
	return window.location.href;
}
function getFinal() {
	var url = identityUrl();
	url = url.substring(url.lastIndexOf('/') + 1);
	if (url.length > 1)
		url = url.substring(0, url.lastIndexOf('?'));
	return url;
}

/** @auth Matheus
 *  IMPLEMENTANDO STICKY FOOTER
 */
function stickyFooter() {
	applySticky(jQuery('#wrap > #content, #wrap + footer'), 'padding-bottom, margin-top');
}
function applySticky(elements, styles) {
	var properties = styles.split(',');
	jQuery(elements).each(function(i) {
		jQuery(elements[i]).css(jQuery.trim(properties[i]), function() {
			if (i == 0)
				return getHeight(elements[1]); // [0] = section#content, [1] = footer
			else
				return "-" + getHeight(elements[1]); // [0] = section#content, [1] = footer
		});
	});
}
function getHeight(obj) {
	return $(obj).css('height');
}

/** @auth Matheus
 *  FUNCAO PARA MUDAR O ICONE DE + PARA - OU - PARA + 
 */
function toggleIconSquaredPlusToMinus(obj) {
	var icon = jQuery(obj).find('i');
	if ($(icon).attr('class') == 'icon-plus-squared')
		$(icon).removeClass().addClass('icon-minus-squared');
	else
		$(icon).removeClass().addClass('icon-plus-squared');
}