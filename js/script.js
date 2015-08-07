$(function()
{
	var IMG_MAXIMO = 10;
	var palabras = [];
	var opcPalabras = [];
	var armaPalabra = []; //Guardará los datos de la palabra que se está armando...
	var numPalabra = Number(localStorage.getItem("numero")) || 0;
	var owl = $("#owl-demo");//Referencia al carrusel que muestran las imágenes...
	//Los audios que se manejaran en el juego...
	var audios = [
					{
						sonido 	: 	"presiona.mp3", 
						label	: 	"presiona"
					},
					{
						sonido 	: 	"error.mp3", 
						label	: 	"error"
					}, 
					{
						sonido 	: 	"tada.mp3", 
						label	: 	"tada"
					}
				];
	//Configuración del Carrusel...
	owl.owlCarousel(
	{
		autoPlay: 3000,
		itemsDesktop : [1199,3],
		itemsDesktopSmall : [979,3]
	});
	//Para cargar los audios del juego...
	for(var audio = 0; audio < audios.length; audio++)
	{
		createjs.Sound.registerSound("sounds/" + audios[audio].sonido, audios[audio].label);
	}

	//Traer las imágenes de flickr, de acuerdo a los tags enviados...
	var imagenes = function(tags)
	{		
    	//Cargador del carrusel...
    	owl.data('owlCarousel').addItem("<img src = 'img/loading.gif' border = '0' class = 'imgCarrusel'>");
		$.getJSON("https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
	    {
	        tags: tags, 
	        format: "json"
	    },
	    function(data)
	    {
	        owl.data('owlCarousel').removeItem(0);
	        $.each(data.items, function(i , item)
	        {
	            owl.data('owlCarousel').addItem("<img src = '"+(item.media.m)+"' border = '0' class = 'imgCarrusel'>");
	            if(i >= IMG_MAXIMO - 1)
	            {
	            	return false;
	            }
	        });
	    });
	};

	//Cargar el archivo JSON que contiene las palabras...
	var cargarJson = function()
	{
		var txtOpciones = "";
		$.getJSON( "js/palabras.json", function(data)
		{
			palabras = data;
			//Crear los elementos donde se pondrán las palabras a adivinar...
			for(var i = 1; i <= 21; i++)
			{
				$("#opciones").append("<div class = 'divLetra' id = 'opc_"+(i)+"'></div>");
				$("#opc_" + i).click(function(event)
				{
					var espacioLibre = false;
					var ind = Number(this.id.split("_")[1]) - 1;
					if(!opcPalabras[ind].selecciona)
					{
						//Buscar la posción que este libre para ubicar la palabra seleccioanda...
						for(var i = 1; i <= armaPalabra.length; i++)
						{
							if(!armaPalabra[i - 1].ocupado)
							{
								espacioLibre = true;
								armaPalabra[i - 1].letra = opcPalabras[ind].letra;
								armaPalabra[i - 1].ocupado = true;
								armaPalabra[i - 1].posOrg = ind;
								$("#pal_" + i).html(opcPalabras[ind].letra);
								break;
							}
						}
						if(espacioLibre)
						{
							createjs.Sound.play("presiona");
							opcPalabras[ind].selecciona = true;
							$(this).addClass("selecciona");
							palabraBien();
						}
					}
				});
				//Reiniciar objeto de las letras que saldrán como opción...
				opcPalabras.push({
									letra 	: "", 
									selecciona	: false
								});
			}
			//Cargar el juego...
			cargaJuego();
		});
	}();

	//Revisa si la palabra es correcta...
	var palabraBien = function()
	{
		var palabraCompara = palabras[numPalabra].palabra.toLocaleUpperCase();
		var cont = 0;
		var numOcupado = 0;
		for(var i = 0; i < palabraCompara.length; i++)
		{
			if(palabraCompara.charAt(i) === armaPalabra[i].letra)
			{
				cont++;
			}
			if(armaPalabra[i].ocupado)
			{
				numOcupado++;
			}
		}
		if(cont === palabraCompara.length)
		{
			createjs.Sound.play("tada");
			swal(
	    	{
	    		title: palabraCompara,   
	    		text: "Muy bien la palabra es: " + palabraCompara,
	    		showCancelButton: false,   
	    		confirmButtonColor: "#DD6B55",  
	    		confirmButtonText: "Aceptar", 
	    		closeOnConfirm: false, 
	    		type: "success", 
	    	},
	    	function()
	    	{
	    		swal({title: "Cargando",   text: "Se están cargando las imágenes",   timer: 500,   showConfirmButton: false });
	    		numPalabra++;
	    		if(numPalabra < palabras.length)
	    		{
	    			cargaJuego();
	    		}
	    		else
	    		{
	    			localStorage.setItem("numero", 0);
	    			window.location.href = "https://github.com/Jorger";
	    		}
	    	});
		}
		else
		{
			//Poner el color dependiendo del estado...
			for(i = 1; i <= armaPalabra.length; i++)
			{
				if(numOcupado === palabraCompara.length)
				{
					$("#pal_" + i).addClass('palabraMal');
				}
				else
				{
					$("#pal_" + i).removeClass('palabraMal');
				}
			}
		}
		
	};

	//Para iniciar la carga del juego...
	var cargaJuego = function()
	{
		$("#titulo").html("Adivinando (" + (numPalabra + 1 <= 9 ? "0" + (numPalabra + 1) : numPalabra + 1) + ")");
		//Para guardar en localStorage el número de la palabra en que se encuentra el usuario...
		localStorage.setItem("numero", numPalabra);
		//Se reinicia la variable de aramar la palabra...
		armaPalabra = [];
		if(numPalabra !== 0)
		{
			//Remover las imagenes anteriores del carrusel...
			for(var i = 1; i <= 21; i++)
	    	{
	    		opcPalabras[i - 1].letra = "";
	    		opcPalabras[i - 1].selecciona = false;
	    		$("#opc_" + i).removeClass("selecciona");
	    		if(i <= IMG_MAXIMO)
	    		{
	    			owl.data('owlCarousel').removeItem(0);
	    		}
	    		if(i <= palabras[numPalabra - 1].palabra.length)
	    		{
	    			//Remover los div's de la palabra...
	    			$("#pal_" + i).remove();
	    		}
	    	}
		}
		//Cargar las imagenes del juego...
		imagenes(palabras[numPalabra].tags.join(","));
		//Reiniciar la variable de palabras...
		var posRandom = 0;
		var letraPone = "";
		//Para crear los elementos donde estarán las palabras...
		for(i = 1; i <= palabras[numPalabra].palabra.length; i++)
		{
			$("#adivina").append("<div class = 'divLetra baseLetra' id = 'pal_"+(i)+"'>&nbsp;</div>");
			letraPone = palabras[numPalabra].palabra.charAt(i - 1).toLocaleUpperCase();
			armaPalabra.push({
								letra 		: 	"", 
								ocupado 	: 	false, 
								posOrg	 	: 	0
							});
			//Ubicar aleatoriamente las letras de la palabra en los campos del teclado...
			do
			{
				posRandom = Math.floor(Math.random() * 21) + 1;
				if(opcPalabras[posRandom - 1].letra === "")
				{
					opcPalabras[posRandom - 1].letra = letraPone;
					$("#opc_" + posRandom).html(letraPone).addClass("noSelecciona");
					break;
				}
			}while(1);
			//Acción de devolver la letra a la posición original..
			$("#pal_" + i).click(function(event)
			{
				var ind = Number(this.id.split("_")[1]) - 1;
				if(armaPalabra[ind].ocupado)
				{
					armaPalabra[ind].letra = "";
					armaPalabra[ind].ocupado = false;
					//Activar la letra en el teclado...
					opcPalabras[armaPalabra[ind].posOrg].selecciona = false;
					$("#opc_" + (armaPalabra[ind].posOrg + 1)).removeClass('selecciona').addClass("noSelecciona");
					armaPalabra[ind].posOrg = 0;
					$(this).html("&nbsp;");
					createjs.Sound.play("error");
					palabraBien();
				}
			});
		}

		//Completar las demáas espacios con letras aleatorias...
		for(i = 1; i <= opcPalabras.length; i++)
		{
			if(opcPalabras[i - 1].letra === "")
			{
				letraPone = String.fromCharCode(((Math.floor(Math.random() * 25) + 1) - 1) + 65);
				//Poner palabras aleatorias...
				opcPalabras[i - 1].letra = letraPone;
				$("#opc_" + i).html(letraPone).addClass("noSelecciona");
			}
		}
	};
	
	//Para desplegar la ayuda de la palabra...
	$("#ayuda").click(function(event)
	{
	    swal({
	    			title		: 	"Pista",   
	    			text 		: 	palabras[numPalabra].pista,
	    			imageUrl	: 	"img/pista.png"
			});
	});
});
