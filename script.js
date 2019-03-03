

/**
 * Test de pureté original : (test-purete.boudah.pl)
 *
 * Créé par Boudah Talenka (boudah.pl) et ruiné par Flygoow (flygoow.party)
 * et publié sous licence GNU General Public License.
 */
'use strict';


/**
 * Compteur de point pour chaque catégorie de question.
 * @type {Object.<string, number>}
 */
var scores = {
  'zizisexuel': 0,
  'bigard': 0,
  'alien': 0,
  'gamer': 0,
  'chrétien': 0,
  'vbucks': 0
};


/**
 * Coefficient pour chaque catégorie qui permet de normalisé les points (en
 * fixant le maximum)
 * @type {Object.<string, number>}
 */
const coefs = {
  'zizisexuel': 1.96,
  'bigard': 2.78,
  'alien': 3.44,
  'gamer': 3.22,
  'chrétien': 1.85,
  'vbucks': 0.5
};


/**
 * Noms et position des niveaux de pureté (attention, les noms sont associés aux
 * classes CSS). Le nombre correspond au seuil de points dans une catégorie pour
 * activer le niveau.
 *
 * @type {Object.<string, number>}
 */
const niveaux = {
  'luigi': 20,
  'mario': 10,
  'cool': 0,
  'normal': -10,
  'immoral': -15,
  'impur': -20,
  'indecent': -25,
  'malsain': -30,
  'ignoble': -35,
  'vicieux': -40,
  'infame': -45,
  'deprave': -50,
  'linkthesun': -61,
  'nordiste': -72,
  'jdg': -85,
  'fanta': -100,
  'alien': -200
};


/**
 * L'élément HTML qui va contenir les questions/réponses
 * @type {Element}
 */
var conteneur;


/**
 * Liste des questions
 * @type {Array.<{categorie: string,
 *                texte: string,
 *                choix: Object.<string, number>}>}
 */
const questions = [
  {
    categorie: 'gamer',
    texte: 'Nous sommes en année 2054. Vous vous dirigez vers le Monoprix, avec un billet de 5€. Que prenez-vous ?',
    choix: {'Des pâtes ennuyantes': -1, 'Une délicieuse barre Feed à seulement 3,90€ pour 3 repas !': 1}
  },
  {
    categorie: 'gamer',
    texte: 'Avez vous une PP Wankul sur Twitter ?',
    choix: {'Oui': 2, 'Non': -1}
  },
  {
    categorie: 'zizisexuel',
    texte: 'Avez-vous déjà été nu(e) une fois dans votre vie ?',
    choix: {'Oui': -2, 'Non': 0}
  },
  {
    categorie: 'chrétien',
    texte: "Avez-vous déjà, par accident ou Non, mis votre zizi sexuel dans un trou quelconque ?",
    choix: {"Oui": -1,"Oui, je pardonne mes pêchés. J'ai bel et bien mis mon zizi sexuel à plus de 1 micromètre de profondeur dans un trou, un jour.": 0, 'Non': 0}
  },
  {
    categorie: 'zizisexuel',
    texte: 'Avez-vous déjà touché à votre zizi sexuel ?',
    choix: {'Oui': -5, 'Non': 0}
  },
  {
    categorie: 'gamer',
    texte: 'Vous est-il arrivé de ne pas vous laver ?',
    choix: {
      '4 jours ou +': +6,
      '3 jours': +4,
      '2 jours': +2,
      '+ de 24h': 0,
      'Je me lave tout les jours': -5
    }
  },
  {
    categorie: 'bigard',
    texte: 'Avez-vous déjà cherché "Blagues de Bigard" sur Google ?',
    choix: {'Oui': 1, 'Non': 0, "C’est un homme à table avec sa femme. Il lui dit : « Tu vas plus me voir pendant 5 min. » « Pourquoi ça ? », répond t'elle. « Parce que je vais t’enculer. »": 2}
  },
  {
    categorie: 'bigard',
    texte: "Avez-vous déjà insulté quelqu'un parce qu'il ne buvait pas d'alcool ?",
    choix: {'Oui': 1, 'Non': -1, "Pourquoi les femmes malaxent-elles les couilles quand elles sucent ? Pour éviter les grumeaux.": 2}
  },
  {
    categorie: 'bigard',
    texte: 'Donnez-vous le reste de votre repas à votre chien mourrant ?',
    choix: {'Oui': 2, 'Non': -1, 'Si l’avortement est un meurtre, la branlette c’est quoi, un génocide ?': 1}
  },
  {
    categorie: 'chrétien',
    texte: 'La 3ème réponse à la question précédente était horrible.',
    choix: {'Oui seigneur.': 2, "J'ai acheté le spectacle de Bigard à 10€ en Blu-ray": -1}
  },
  {
    categorie: 'bigard',
    texte: 'Avez-vous déjà mis deux doigts dans le cul à des fantômes ?',
    choix: {'Oui': 1, 'Non': -2, "Avant il fallait écarter le slip pour voir les fesses, maintenant il faut écarter les fesses pour voir le slip.": 2}
  },
  {
    categorie: 'bigard',
    texte: 'Êtes-vous le vrai Jean Marie Bigard ?',
    choix: {'Oui': 3, 'Non': 0, 'Quelle est la durée de vie d’une moule ? Douze ou treize ans, car après il y a des poils et ça s’appelle une chatte.':1}
  },
  {
    categorie: 'bigard',
    texte: "Catherine, si tu lis ceci c'est que je suis désolé de comment notre relation a tournée. Je peux changer, et je veux<br>qu'on enterre toute cette histoire et que l'on se remette ensemble. Accepte mes excuses.",
    choix: {'Oui': 0, 'Non': 0, 'Qu’est-ce qu’une blonde dans le coin d’une pièce avec les jambes écartées ? Un humidificateur d’air.':1}
  },
  {
    categorie: 'bigard',
    texte: "<img src=images/bigard.jpg width=100><br>Aimez-vous cette photo ?",
    choix: {'Oui': 1, 'Non':-2}
  },
  {
    categorie: 'alien',
    texte: 'Habitez-vous à Amiens ?',
    choix: {'Oui': -50, 'Non': 0}
  },
  {
    categorie: 'zizisexuel',
    texte: 'Avez-vous déjà eu les tétons ou le zizi sexuel dur ?',
    choix: {'Oui (gros dégueulasse)': -3, 'Non': 0}
  },
  {
    categorie: 'bigard',
    texte: 'Appellez-vous Macron "Macaron" ?',
    choix: {"Oui, c'est tellement marrant": 2, 'Non': -1}
  },
  {
    categorie: 'bigard',
    texte: 'En moyenne, combien de fois battez-vous votre femme ?',
    choix: {
      'Presque tous les jours': 8,
      '4 fois': 5,
      '3 fois': 3,
      '2 fois': 2,
      'Une fois ou moins souvent': 1,
      'Jamais': -2
    }
  },
  {
    categorie: 'bigard',
    texte: "Laissez-vous un petit pourboire aux serveurs que quand c'est des filles ?",
    choix: {'Oui': 1, 'Non': -1}
  },

  {
    categorie: 'bigard',
    texte: "Jean Marie Bigard ?",
    choix: {"SORTEZ-VOUS LES DOIGTS DU CUL !!": 1, 'Humouriste':-1}
  },
  {
    categorie: 'chrétien',
    texte: 'Si vous appuyez sur "Oui" vous irez chercher du Feed lors de la prochaine question.',
    choix: {'Oui': 1, 'Oui':1}
  },
  {
    categorie: 'chrétien',
    texte: 'Êtes vous actuellement en route pour chercher votre bouteille de Feed ?',
    choix: {'Oui': 2, "Non seigneur, j'ai péché !": -1}
  },
  {
    categorie: 'chrétien',
    texte: 'Avez-vous déjà insulté Jul ?',
    choix: {'Oui': -8, 'Non': 9}
  },
  {
    categorie: 'chrétien',
    texte: 'Avez-vous déjà blessé volontairement quelqu’un ?',
    choix: {
      'Oui': -8,
      'Oui mais je suis prêtre': 8,
      'Non': 0
    }
  },
  {
    categorie: 'zizisexuel',
    texte: 'Avez-vous déjà bloqué votre boule ?',
    choix: {'Oui': 2, 'Non': 0}
  },
  {
    categorie: 'zizisexuel',
    texte: "L'avez-vous bloquée à l'écran du mot de passe ?",
    choix: {'Oui': 3, 'Non': 0}
  },
  {
    categorie: 'zizisexuel',
    texte: "Quel est l'état actuel de votre zizi sexuel ?",
    choix: {'Circoncis': -15, 'Non circoncis': 3, 'Je suis une fille': 0,}
  },
  {
    categorie: 'chrétien',
    texte: 'Avez-vous déjà profité de quelqu’un pendant qu’il/elle était ' +
        'ivre, drogué(e), ou momentanément handicapé(e) ?',
    choix: {'Oui': -3, 'Oui mais je suis prêtre': 3, 'Non': 0}
  },
  {
    categorie: 'zizisexuel',
    texte: 'Avez-vous le guide du zizi sexuel ?',
    choix: {'Oui': 2, 'Non': -2}
  },
  {
    categorie: 'zizisexuel',
    texte: "Prenez-vous votre O'Tacos avec ou sans smegma ?",
    choix: {'Avec': 1, 'Sans (le naze)': -1}
  },
  {
    categorie: 'zizisexuel',
    texte: 'Voulez-vous baiser Josiane de Scènes de Ménage ?',
    choix: {'Mdrr oh que oui': 8, 'Non': -20}
  },
  {
    categorie: 'zizisexuel',
    texte: 'Tu suces ?',
    choix: {'Oui': 1, 'Non': -1}
  },
  {
    categorie: 'zizisexuel',
    texte: 'Faites-vous des pets de bite ?',
    choix: {'Oui': -1, 'Non': 1, "Je n'ai plus mon prépuce et je suis nul": -2}
  },
  {
    categorie: 'zizisexuel',
    texte: 'Faites-vous des pets de chatte ?',
    choix: {'Oui': -1, 'Non': 1, "Ma mère est morte": 0}
  },
  {
    categorie: 'gamer',
    texte: 'Sans compter celle de maternelle, avez-vous déjà eu une petite copine ?',
    choix: {'Oui': -2, 'Non': 3}
  },
  {
    categorie: 'gamer',
    texte: 'Avez-vous compté celle de maternelle ?',
    choix: {"Oui seigneur. Mais j'ai eu une seconde petite copine ou plus lors de ma période lycée/collège ou autre.": 0, "Non, seigneur. Je n'ai jamais eu de petite copine en maternelle.": 0, "Excusez moi seigneur !! J'ai péché !!": -3, "J'ai jamais eu de petite copine.": 0}
  },
  {
    categorie: 'chrétien',
    texte: "Combien de gaufres avez-vous mangé aujourd'hui",
    choix: {"Beaucoup (sans l'autorisation de ma maman)": -5, "Beaucoup (avec l'autorisation de ma maman)": 5, 'Non': 0}
  },
  {
    categorie: 'zizisexuel',
    texte: 'Avez-vous déjà pissé sur votre dédicace de Zep ?',
    choix: {'Oui': 1, 'Non': -1}
  },
  {
    categorie: 'zizisexuel',
    texte: 'Allez-vous pleurer ?',
    choix: {'Oui': 1, 'Non': 0}
  },
  {
    categorie: 'zizisexuel',
    texte: 'Pisser dans votre froc peut-être ?',
    choix: {'Oui': 1, 'Non': 0}
  },
  {
    categorie: 'zizisexuel',
    texte: 'Ou peut-être chier et éjaculer ?',
    choix: {"Oui j'avoue": 1, 'Non': 0}
  },
  {
    categorie: 'zizisexuel',
    texte: "Ce quiz est sponsorisé par NordVPN. NordVPN est un VPN pratique et super rapide ! Il s'agit<br>même du VPN le plus avancé au monde ! Vous pouvez regarder des films Netflix d'autres pays ! Utilisez le code PURETEFREE pour<br>profiter d'un essai gratuit de 1 mois.",
    choix: {'Oui': 2, "Non (si tu choisis ça t'es un gros con)": -7}},
  {
    categorie: 'zizisexuel',
    texte: 'Avez-vous vous déjà été horny on main ?',
    choix: {'Oui': -1, 'Non': 1, "Je suis l'Ermite Moderne": 3}
  },
  {
    categorie: 'zizisexuel',
    texte: 'Ecrivez-vous des fanfics sur VoxMakers ?',
    choix: {'Oui': -1, 'Non': 1}
  },
  {
    categorie: 'zizisexuel',
    texte: 'Est-ce que vous avez pissé une fois dans votre vie ?',
    choix: {'Oui': -2, 'Non': 1}
  },
  {
    categorie: 'zizisexuel',
    texte: 'Avez vous déjà répondu à un appel de votre pote sur Discord pour jouer à CS pendant un acte sexuel ?',
    choix: {'Oui': -1, "Oui, le jeu vidéo n'attend pas !! CASQUE:ON CLAVIER:ON, je suis prêt !": 2, 'Non': 0}
  },
  {
    categorie: 'zizisexuel',
    texte: 'Avez-vous déjà acheté quelque chose dans un sex-shop ?',
    choix: {'oui': -1, 'Non': 0}
  },
  {
    categorie: 'gamer',
    texte: 'Avez-vous un tiroir à pisse ?',
    choix: {'oui': 2, 'Non': -2}
  },
  {
    categorie: 'zizisexuel',
    texte: 'Avez-vous déjà eu des relations sexuelles ' +
        'avec quelqu’un de votre famille ?',
    choix: {'Oh que oui, je suis Maxildan': -4, 'Non': 0}
  },
  {
    categorie: 'zizisexuel',
    texte: 'Avez-vous hésité avant de répondre à la question précédente ?',
    choix: {"Oui j'ai une crise identitaire": -1, 'Non': 0}
  },
  {
    categorie: 'gamer',
    texte: 'Harcelez-vous des minorités sur les réseaux sociaux ?',
    choix: {'Oui': 2, "Oui mais le second degré n'est pas qu'une température lol ^^": 2, 'Non': -1}
  },
  {
    categorie: 'gamer',
    texte: 'Avez-vous dit le N word au moins une fois ?',
    choix: {'Oui': 2, 'Oui mais je suis noir': 0, "Oui car j'ai le pass 😜":1, "Non":-1, "Pewdiepie":3}
  },
  {
    categorie: 'chrétien',
    texte: 'Est-ce que la zoophilie, la nécrophilie ou ' +
        'la pédophilie vous attire ou vous excite ?',
    choix: {'Oui':-3, 'Oui car je suis prêtre': 2, 'Non': 0}
  },
  {
    categorie: 'zizisexuel',
    texte: "Est-ce que cette image vous excite ?<br><img src=images/donkey.png width=200>",
    choix: {'Oui': -1, 'Non': 0}
  },
  {
    categorie: 'chrétien',
    texte: 'Avez-vous déjà posté Mario Bros au cul amplé ou Thanos avec un large appareil ?',
    choix: {"Oui maître... J'ai peché et je l'ai fait... Plusieurs fois même !!": -5, 'Moi ?? Du sexe dégueulasse ?? Jamais !!': 3}
  },
  {
    categorie: 'zizisexuel',
    texte: "antoine daniel",
    choix: {'antoine daniel': -1, 'antoine daniel': -1}
  },
  {
    categorie: 'zizisexuel',
    texte: "Avez-vous hésité avant de répondre à la précédente question ?",
    choix: {'Oui': -3, 'Non': 2}
  },
  {
    categorie: 'gamer',
    texte: 'Combien avez-vous de centimètres de pellicules sur vos cheveux ?',
    choix: {'4cm ou plus': 3, '3cm': 2, '2cm': 1, '1cm': 1, 'Aucun, je suis un homme propre (la honte)':-2}
  },
  {
    categorie: 'gamer',
    texte: 'Avez-vous déjà été ami avec une personne de sexe opposé ou de couleur différente ?',
    choix: {'Oui': -1, "Non car je suis un gamer et je hais les minorités": 2}
  },
  {
    categorie: 'gamer',
    texte: 'Êtes-vous abonné au chef Otaku ?',
    choix: {'Oui': 1, 'Non': -1}
  },
  {
    categorie: 'chrétien',
    texte: 'Avez vous pour main Smash Bros Ness ?',
    choix: {'Oui': -5, "Non, j'ai un perso Fire Emblem :)": -6, "Non": 2}
  },
  {
    categorie: 'chrétien',
    texte: 'Avez-vous un CD Crazy Frog ?',
    choix: {'Oui': 2, 'Non': -2, "J'ai Axel F en vinyle": -2}
  },
  {
    categorie: 'chrétien',
    texte: "L'utilisez-vous pour prier ?",
    choix: {'Oui': 4, 'Non': 0}
  },
  {
    categorie: 'gamer',
    texte: 'Avez vous déjà fait boire votre urine à quelqu’un d’autre ?',
    choix: {'Oui': 3, 'Oui, dans une bouteille de Feed': 5, 'Non': -2}
  },
  {
    categorie: 'chrétien',
    texte: 'Suivez-vous YassEncore sur Twitter ?',
    choix: {'Oui': -2, 'Non': 1}
  },
  {
    categorie: 'chrétien',
    texte: 'Êtes-vous abonné à Michou ?',
    choix: {'Oui': -1, 'Non': 1}
  },
  {
    categorie: 'chrétien',
    texte: 'Avez-vous déjà tweeté "nos chômeurs ont du talent" sous un tweet créatif ?',
    choix: {'Oui': -5, 'Non': 1, "Non, j'ai préféré RT le tweet créatif": 4}
  },
  {
    categorie: 'bigard',
    texte: 'Avez-vous déjà été à un spectacle de Bigard ?',
    choix: {'Oui': 2, 'Non': -1, "Est-ce que ça se voit que je manque d'idées là":0}
  },
  {
    categorie: 'gamer',
    texte: 'Comment de litres de gras avez-vous sur les cheveux ?',
    choix: {'Aucun je suis propre': -1, 'Entre 0,1L et 1L': 2, 'Plus de 1L': 4}
  },
  {
    categorie: 'chrétien',
    texte: 'Achetez Coca-Cola',
    choix: {'Oui': 0}
  },
  {
    categorie: 'gamer',
    texte: 'Trouvez-vous ça OK de coucher avec votre soeur ?',
    choix: {"T'es complétement malade Maxildan": -1, "Je suis d'accord avec toi Maxildan !": 1}
  },
  {
    categorie: 'gamer',
    texte: 'Combien avez-vous de Jahcoins ?<br><img src=images/jahcoin.png width=100>',
    choix: {'+50': 8, 'Entre 49 et 30': 4, 'Entre 29 et 10':2,'Entre 10 et 1':1, "Aucun":-2}
  },
  {
    categorie: 'chrétien',
    texte: 'Avez-vous effectué un des actes de ce test ' +
        'exprès pour améliorer votre score ?',
    choix: {'Ta gueule': 0}
  },
  {
    categorie: 'chrétien',
    texte: 'Avez-vous répondu honnêtement aux questions ?',
    choix: {'Oui seigneur': 1, "J'avoue. Je n'ai pas répondu sérieusement aux questions proposées seigneur. Mais comprenez-moi,<br>je suis dans une situation compliquée en ce moment. J'ai une famille à nourrir, mais mon<br>patron m'a viré de mon job. Je fais de mon mieux et je jongle entre cachets et dépression. <br>Pardonnez-moi.": -2}
  }
];


/**
 * Numéro de la question courante
 * @type {number}
 */
var questionCourante = 0;

function afficherEnvoiResultats() {

  /** @type {string} */
  var resultat = '';

  for (var categorie in scores) {
    resultat += categorie + ' : ' + scores[categorie] + '\n';
  }

    preventDefault();
    var twitterWindow = window.open('https://twitter.com/share?url=' + "J'ai eu " + resultat + "au test de pureté version 2019 pour jeunes riches, cools et parisiens. Teste ici : " + document.URL, 'twitter-popup', 'height=350,width=600');
    if(twitterWindow.focus) { twitterWindow.focus(); }
      return false;
    }


/**
 * Ouvre une fenêtre pour envoyer les résultats par mail
 */

/**
 * Incrémente le compteur associé à la réponse de l'utilisateur
 * @param {Event} e La réponse choisie.
 */
function compterPoint(e) {

  /** @type {string} Réponse choisie à la question */
  const reponse = String(e.target.innerHTML);

  /** @type {number} Combien de points rapporte la question */
  const points = questions[questionCourante].choix[reponse];

  // On incrémente le vbucks
  scores['vbucks'] += points * coefs['vbucks'];

  // On incrémente le score de la catégorie correpondante à la question courante
  scores[questions[questionCourante].categorie] +=
      points * coefs[questions[questionCourante].categorie];

  /** @type {string} Nom du niveau atteint (pour chaque catégorie) */
  var r;

  /** @type {string} Contenu HTML de la liste des scores */
  var html;

  // On parcourt les scores de chaque catégorie
  for (var n in scores) {
    r = '?';

    // On détermine le nom du niveau atteint dans chaque catégorie
    for (var v in niveaux) {
      if (scores[n] >= niveaux[v]) {
        r = v;
        break;
      }
    }

    html = '';

    for (var v in niveaux) {
      html += '<b class="' + v + ((r == v) ? ' k' : '') + '">' + v + '</b>';
    }

    fillNode(getId('b'), html);

    getId(n).innerHTML = n + tag('b', Math.round(scores[n]) + '<br>' + r);

    getId(n).className = document.body.className = r;
  }

  // Si l'on n'a pas atteint la dernière question, on affiche la suivante
  if (questionCourante < questions.length - 1) {
    questionCourante++;
    afficherQuestion();

  // Si le questionnaire est fini, on affiche le résultat et on propose l'envoi
  // des résultats par email.
  } else {

    /** @type {string} Niveau final en vbucks */
    const pk = getId('vbucks').getElementsByTagName('b').item(0)
                   .innerHTML.split('<br>')[1];

    conteneur.innerHTML = '<p><big><big>' +
                          'C’est fini : Vous êtes <b>' + pk + '</b> ' +
                          '(' + scores['vbucks'] + ' v-bucks)' +
                          '</big></big></p>'
  }
}


/**
 * Affiche la question suivante
 */
function afficherQuestion() {

  // On affiche la question
  fillNode(conteneur, tag('p', questions[questionCourante].texte));

  // On affiche la liste des choix possibles
  for (var r in questions[questionCourante].choix) {
    fillNode(appendNode(conteneur, 'button'), r)
        .addEventListener('click', compterPoint);
  }
}


/**
 * Affiche la liste des questions dans un tableau
 */
function afficherListeQuestions() {

  /** @type {string} */
  var html = '<table border=1>' + tag('tr',
                                      tag('th', 'Type') +
                                      tag('th', 'Question') +
                                      tag('th', 'Choix (points)'));

  /** @type {string} Liste des choix d'une question */
  var o;

  /** @type {{categorie: string, texte: string, choix: Object}} */
  var question;

  for (var q = 0; q < questions.length; q++) {
    o = '';
    question = questions[q];

    for (var r in question.choix) o += r + ' (' + question.choix[r] + '), ';

    html += tag('tr',
                tag('td', question.categorie) +
                '<td align=left>' + question.texte + '</td>' +
                tag('td', o));
  }

  fillNode(conteneur, html + '</table>');
}


/** Initialisation du questionnaire */
function demarrage() {

  /** @type {string} Tableau HTML des scores */
  var tableauScores = '';

  for (var n in scores) tableauScores += tag('li', '', n);

  fillNode(create('header'),
      tag('konbini', '<a href=https://flygoow.party><img src=images/Présenté.png width="220" height="250" class="konbini"></a>') +
      tag('testp', '<a href=.><img src=images/testPP.png width="600" height="250" align="right" class="testp"></a>'))

  fillNode(create('body'),
           tag('h1', '<a>SPONSORISÉ PAR <img src=images/feedlogo.png width="210" height="65" align="bottom" class="feed"> ET <img src=images/acf.png width="190" height="65" align="bottom" class="acf"></a>') +
           tag('ul', tableauScores) +
           tag('div',
               '<p>Test écrit, rédigé, codé, réalisé, monté, distribué, scénarisé, mise en boîte par ' +
               '👑 HUGO CLEMENT 👑 (roi du monde 👑).<br>Tout le reste de la tâche a été faite par 💩Hideo Kojima💩 (grosse merde ayant un QI inférieur au mien).</p>' + button('COMMENCER') +
               tag('s',
               tag('feed1', '<a href=https://flygoow.party><img src=images/pubfeed.png width="300" height="600" align="left" class="pub1" style="margin:0 10px 0 30px;margin-top: -295px;"></a>') +
               tag('feed2', '<a href=https://flygoow.party><img src=images/pubfeed2.png width="300" height="600" align="right" class="pub2" style="margin:0 10px 0 30px;margin-top: -295px;"></a>')+
               tag('feed3', '<a href=https://flygoow.party><img src=images/pubfeed3.png width="730" height="90" class="pub3" style="margin: 0 225px 0 0px; margin-top: 215px;margin-left: 204px;"></a>'))+
               tag('footer',
                   tag('a',
                    'Karmen') + '. ' +
                   "Si tu lis ce message, c'est que je suis désolé de " +
                   'comment notre relation a tourné, si tu veux me voir ' +
                   'pour en parler, tu sais où me trouver. Rends moi mes gosses.'), 'j') +
                    tag('nav', '', 'b'));
                    

  conteneur = getId('j');

  getId("COMMENCER").addEventListener('click', afficherQuestion);
}


// Quand la page est complètement chargée, on démarre
window.addEventListener('load', demarrage);
