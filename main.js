/* Require documents */
const Discord = require('discord.js');

/* */
var insulte = ['connard', 'encule', 'salope', 'fdp', "fils de pute", 'va te faire enculer', 'bande d’abrutis','encule de ta race', 'bougnoule'];

/* Objet bot */
var bot = new Discord.Client();

/* Action bot démarrage */
bot.on('ready', () => {
    /* Affiche le jeux du bot */
    bot.user.setPresence({ game: { name: 'surveiller le discord', type:0}});
    /* Affiche la connexion dans la console */
    console.log('Bot connecter !');
});

/* Connexion du bot */
bot.login(process.env.TOKEN);
/* Réception d'un message */
bot.on('message',message => {
    /* Je vérifie que c'est pas un message du bot */
    if (message.author.id != 478284566130327554) {
        /* Déclaration des variable */
        strings = no_accent(message.content); // Récupération du message
        i=0;
        calcule = 0;
        character='';

        /* Boucle qui analize chaque lettre */
        for (let i = 0; i < strings.length; i++) {
            character = strings.charAt(i);
            if (isEmoji(message.content) == true) {
                null;
            } else {
                /* Détection si c'est un caratere numerique */
                if (!isNaN(character * 1)){
                    calcule = calcule+1; // on ajoute 1 a la variable "calcule"
                } else {
                    /* Détection si c'est un caratere majuscule */
                    if (character == character.toUpperCase()) {
                        calcule = calcule+1; // on ajoute 1 a la variable "calcule"
                    }
                }
            }

        }

        /* On regarde si le nombre de majuscule et de caratere numérique est égale a nombre de caratere dans le message */
        if (calcule == strings.length) {
            quarantaine("Caps Lock");
        }

        /* Boucle qui analize chaque mot */
        for (let x = 0; x < insulte.length; x++) {
            strings = strings.toLowerCase(); //on mes tout en minuscule

            var Resultat = strings.indexOf(insulte[x]);
            if (Resultat != -1) { //Si le mot est dans le tableau d'insulte on sanctionne
                quarantaine("Insulte");
                x = insulte.length;
            }
        }
    }

    function quarantaine(raison) {
        console.log(raison +' de ' + message.author + ' avec le message '+message.content); //message dans la console
        message.channel.bulkDelete(1); // Supression du message
        /* message d'avertissement */
        var quarantaine = new Discord.RichEmbed()
            .setColor("#ff0000")
            .addField(`*** :track_next: ${raison} :track_previous: ***`,message.author +" est désormais en quarantaine car il a enfreint les régles avec les message ```js\n "+message.content+"```")

            message.channel.send(quarantaine);
        message.member.addRole(message.member.guild.roles.find("name", "⛔ Zone rouge / red zone ⛔")); // mise en quarantaine
    }

    function no_accent(my_string)
    {
            // tableau accents
            var pattern_accent = new Array(/À/g, /Á/g, /Â/g, /Ã/g, /Ä/g, /Å/g, /Æ/g, /Ç/g, /È/g, /É/g, /Ê/g, /Ë/g,
            /Ì/g, /Í/g, /Î/g, /Ï/g, /Ð/g, /Ñ/g, /Ò/g, /Ó/g, /Ô/g, /Õ/g, /Ö/g, /Ø/g, /Ù/g, /Ú/g, /Û/g, /Ü/g, /Ý/g,
            /Þ/g, /ß/g, /à/g, /á/g, /â/g, /ã/g, /ä/g, /å/g, /æ/g, /ç/g, /è/g, /é/g, /ê/g, /ë/g, /ì/g, /í/g, /î/g,
            /ï/g, /ð/g, /ñ/g, /ò/g, /ó/g, /ô/g, /õ/g, /ö/g, /ø/g, /ù/g, /ú/g, /û/g, /ü/g, /ý/g, /ý/g, /þ/g, /ÿ/g);
     
            // tableau sans accents
            var pattern_replace_accent = new Array("A","A","A","A","A","A","A","C","E","E","E","E",
            "I","I","I","I","D","N","O","O","O","O","O","O","U","U","U","U","Y",
            "b","s","a","a","a","a","a","a","a","c","e","e","e","e","i","i","i",
            "i","d","n","o","o","o","o","o","o","u","u","u","u","y","y","b","y");
     
            //pour chaque caractere si accentué le remplacer par un non accentué
            for(var i=0;i<pattern_accent.length;i++)
            {
                my_string = my_string.replace(pattern_accent[i],pattern_replace_accent[i]);
            }
            return my_string;
    }

    function isEmoji(str) {
        var ranges = [
            '\ud83c[\udf00-\udfff]', // U+1F300 to U+1F3FF
            '\ud83d[\udc00-\ude4f]', // U+1F400 to U+1F64F
            '\ud83d[\ude80-\udeff]' // U+1F680 to U+1F6FF
        ];
        if (str.match(ranges.join('|'))) {
            return true;
        } else {
            return false;
        }
    }
});
