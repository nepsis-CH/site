import type ro from './ro';

const it: Partial<Record<keyof typeof ro, string>> = {
  'site.name': 'Nepsis Svizzera',
  'site.description':
    'Sito ufficiale dei giovani cristiani ortodossi della confraternita Nepsis Svizzera, Metropolia Ortodossa Romena dell’Europa Occidentale e Meridionale, Chiesa Ortodossa Romena.',

  // Menu
  'nav.home': 'Home',
  'nav.activities': 'Eventi',
  'nav.memories': 'Ricordi',
  'nav.patron': 'Santo patrono',
  'nav.members': 'Il team',
  'nav.psaltica': 'Canto bizantino',
  'nav.newsletter': 'Newsletter',
  'nav.contact': 'Contatti',
  'nav.menu': 'Menu',
  'nav.openMenu': 'Apri il menu',
  'nav.closeMenu': 'Chiudi il menu',
  'nav.language': 'Lingua',
  'nav.skipToContent': 'Vai al contenuto',

  // Home
  'home.heroAlt': 'Collage di foto dagli incontri di Nepsis Svizzera',
  'home.tagline': 'Giovani cristiani ortodossi della Svizzera',
  'home.ageRange': 'Nepsis Svizzera si rivolge ai giovani tra i 14 e i 35 anni.',
  'home.about.title': 'Chi è Nepsis Svizzera',
  'home.nextEvent': 'Il prossimo evento',
  'home.noUpcoming':
    'Iscriviti alla newsletter oppure scrivici per essere aggiunto ai nostri gruppi WhatsApp o per seguire le nostre pagine sui social, così resti aggiornato sulle prossime attività.',
  'home.allActivities': 'Tutti gli eventi',
  'home.seeMemories': 'Guarda i nostri ricordi',
  'home.contactUs': 'Scrivici',
  'home.moreAbout': 'Vuoi sapere di più su chi siamo e su cosa facciamo?',
  'home.moreAboutLink': 'Vai alla pagina dei ricordi.',

  // Attività
  'activities.title': 'Eventi',
  'activities.description':
    'Il calendario degli eventi di Nepsis Svizzera: gli eventi futuri e l’archivio di quelli passati.',
  'activities.intro': 'Ti aspettiamo con gioia ai nostri prossimi eventi.',
  'activities.upcoming': 'Il prossimo evento',
  'activities.past': 'Eventi recenti',
  'activities.noUpcoming':
    'Al momento non abbiamo ancora annunciato un nuovo evento. Comunichiamo spesso nei nostri gruppi WhatsApp — scrivici per essere aggiunto, oppure iscriviti alla newsletter.',
  'activities.permanent': 'Attività permanente: lezioni online di canto bizantino',
  'activities.permanentText':
    'Dal lunedì al sabato teniamo lezioni di canto bizantino su Zoom, aperte a tutti i giovani della Metropolia MOREOM.',
  'activities.permanentLink': 'Dettagli sulla pagina del Canto bizantino',
  'activities.register': 'Dettagli e iscrizione',
  'activities.moreInMemories': 'Com’è andata agli eventi più vecchi lo puoi leggere sulla',
  'activities.memoriesPage': 'pagina dei ricordi',

  // Ricordi
  'memories.title': 'Ricordi',
  'memories.description':
    'Ricordi dagli eventi di Nepsis Svizzera, raccolti per anno: pellegrinaggi, escursioni, veglie, congressi e incontri dei giovani ortodossi della Svizzera.',
  'memories.intro': 'Se vuoi sapere come siamo e cosa abbiamo fatto finora, questo è il posto giusto!',
  'memories.year': 'Anno',
  'memories.onlyRo': 'I ricordi sono scritti in lingua romena.',
  'memories.back': 'Torna ai ricordi',
  'memories.readMore': 'Leggi di più',

  // Santo patrono
  'patron.title': 'San Giovanni Cassiano',
  'patron.subtitle': 'Il patrono della confraternita Nepsis Svizzera',
  'patron.description': 'San Giovanni Cassiano, il patrono di Nepsis Svizzera.',
  'patron.iconAlt': 'L’icona di San Giovanni Cassiano',

  // Membri
  'members.title': 'Il team',
  'members.heading': 'Il team di Nepsis Svizzera',
  'members.subtitle': 'Unisciti a noi!',
  'members.description':
    'Il consiglio e i membri di Nepsis Svizzera — i giovani che organizzano le attività della confraternita.',
  'members.role.responsabil': 'Responsabile di Nepsis Svizzera',
  'members.role.presedinte': 'Presidente del Consiglio',
  'members.role.consiliu': 'Membro del Consiglio',
  'members.role.coordonator': 'Coordinatore',
  'members.role.webadmin': 'Amministratore del sito',
  'members.parish': 'Parrocchia',
  'members.missingPhoto': 'La fotografia manca al momento',
  'members.more': 'Come siamo e cosa facciamo lo puoi vedere sulla',
  'members.morePage': 'pagina dei ricordi',

  // Canto bizantino
  'psaltica.title': 'Il gruppo di canto bizantino',
  'psaltica.description': 'Il gruppo di canto bizantino di Nepsis Svizzera offre corsi online di musica liturgica.',
  'psaltica.logoAlt': 'Il logo del Gruppo di Canto Bizantino Nepsis Svizzera',
  'psaltica.materials': 'Materiali per le prove',
  'psaltica.testimonials': 'Testimonianze dell’anno 2020',

  // Newsletter
  'newsletter.title': 'Newsletter',
  'newsletter.description': 'Iscriviti alla newsletter di Nepsis Svizzera!',
  'newsletter.heading': 'Iscriviti alla newsletter',
  'newsletter.text':
    'Di tanto in tanto inviamo per e-mail notizie sulle attività di Nepsis Svizzera. Compila il modulo qui sotto per riceverle anche tu.',
  'newsletter.fallback': 'Se il modulo non si carica, lo puoi aprire direttamente qui:',
  'newsletter.openForm': 'Apri il modulo di iscrizione',

  // Contatti
  'contact.title': 'Contatti',
  'contact.description':
    'Contatta Nepsis Svizzera: e-mail, gruppi Telegram e WhatsApp, social e dati bancari.',
  'contact.writeUs': 'Scrivici',
  'contact.emailIntro': 'Puoi scriverci in qualsiasi momento all’indirizzo:',
  'contact.emailButton': 'Mandaci un’e-mail!',
  'contact.groups': 'I nostri gruppi',
  'contact.groupsText': 'Comunichiamo spesso nei nostri gruppi WhatsApp interni. Se sei giovane, vivi in Svizzera, hai tra i 14 e i 35 anni e vuoi essere aggiunto a questi gruppi, mandaci un’e-mail.',
  'contact.social': 'Social network',
  'contact.bank': 'Dati del conto bancario di Nepsis Svizzera',
  'contact.bank.holder': 'Intestatario del conto',
  'contact.useful': 'Altri indirizzi utili',
  'contact.useful.nepsis': 'Nepsis International',
  'contact.useful.parohii': 'Elenco delle parrocchie ortodosse romene della Svizzera',
  'contact.useful.manastire': 'Monastero romeno « Protezione della Madre di Dio » in Svizzera',
  'contact.useful.mitropolia': 'Metropolia Ortodossa Romena dell’Europa Occidentale e Meridionale',
  'contact.newsletterButton': 'Iscriviti alla newsletter!',
  'contact.newsletterLink': 'Iscriviti alla newsletter',

  // Piè di pagina
  'footer.contact': 'Contatti',
  'footer.social': 'Ci trovi anche su',
  'footer.useful': 'Indirizzi utili',
  'footer.bank': 'Conto bancario',
  'footer.rights': 'Tutti i diritti riservati.',
  'footer.about':
    'Nepsis Svizzera — la confraternita dei giovani cristiani ortodossi romeni della Svizzera, sotto l’omoforio della Metropolia Ortodossa Romena dell’Europa Occidentale e Meridionale.',

  // Diventa membro + banner MOREOM + carosello
  'nav.join': 'Unisciti a noi!',
  'home.eyebrow': 'Associazione dei Giovani Ortodossi',
  'footer.tagline': 'I giovani cristiani ortodossi della Svizzera',
  'home.moreomTitle':
    'Nepsis Svizzera è membro delle confraternite Nepsis della Metropolia Ortodossa Romena dell’Europa Occidentale e Meridionale',
  'home.moreomAlt': 'Lo stemma della Metropolia Ortodossa Romena dell’Europa Occidentale e Meridionale',
  'home.carouselTitle': 'Momenti dalla vita della confraternita',
  'carousel.label': 'Galleria di immagini',
  'carousel.prev': 'Immagine precedente',
  'carousel.next': 'Immagine successiva',
  'join.title': 'Unisciti a noi!',
  'join.description': 'Come puoi unirti alla confraternita dei giovani ortodossi Nepsis Svizzera.',
  'join.cta': 'Scrivici un’e-mail',
  'contact.joinTitle': 'Vuoi unirti alla confraternita?',
  'contact.joinText': 'Sei giovane e vuoi far parte di Nepsis Svizzera? Il primo passo è semplice.',
  'contact.joinLink': 'Unisciti a noi!',

  // Varie
  'event.date': 'Data dell’evento',
  'event.location': 'Luogo',
  'event.pastNotice': 'Questo evento si è già svolto.',
  'notFound.title': 'Pagina non trovata',
  'notFound.text': 'Ci dispiace, la pagina che cerchi non esiste (o è stata spostata).',
  'notFound.home': 'Torna alla pagina principale',
  // --- v10: pagina principală, calendar, galerie foto, psaltică ---
  'home.subtitle': 'la comunità dei giovani ortodossi della Svizzera',
  'home.lead':
    'Organizziamo incontri, pellegrinaggi e attività culturali e spirituali attraverso cui i giovani possono conoscersi e crescere insieme.',
  'home.activities.title': 'Le Nostre Attività',
  'home.activities.meetings': 'Incontri e Pellegrinaggi',
  'home.activities.meetingsText':
    'Pellegrinaggi ai monasteri, escursioni con catechesi e visite nelle parrocchie romene della Svizzera.',
  'home.activities.spiritual': 'Vita Spirituale',
  'home.activities.spiritualText': 'Veglie, Divina Liturgia, discussioni e conferenze con sacerdoti e gerarchi della Metropolia.',
  'home.activities.culture': 'Cultura e Canto Bizantino',
  'home.activities.cultureText':
    'Lezioni online di canto bizantino, visite a musei e biblioteche, proiezioni di film.',
  'activities.calendarTitle': 'Il Calendario degli Eventi {year}',
  'activities.calendarIntro': 'Tutto quello che abbiamo preparato per quest’anno, mese per mese.',
  'activities.calendarEmpty': 'Il calendario di quest’anno non ha ancora eventi annunciati.',
  'activities.calendarNote': 'Il calendario si completa nel corso dell’anno.',
  'activities.statusUpcoming': 'In arrivo',
  'activities.statusPast': 'Si è svolto',
  'activities.statusNext': 'Il prossimo',
  'gallery.title': 'Galleria foto',
  'gallery.description':
    'Tutte le fotografie dai ricordi di Nepsis Svizzera, filtrabili per anno e per evento.',
  'gallery.sections': 'Sezioni Ricordi',
  'gallery.tabEvents': 'Eventi',
  'gallery.intro':
    'Tutte le fotografie dai nostri ricordi. Scegli un anno o un evento e apri qualsiasi foto per vederla più grande.',
  'gallery.filterYear': 'Filtra per anno',
  'gallery.allYears': 'Tutti gli anni',
  'gallery.event': 'Evento',
  'gallery.allEvents': 'Tutti gli eventi',
  'gallery.countOne': '1 fotografia',
  'gallery.countMany': '{n} fotografie',
  'gallery.lightboxLabel': 'Fotografia ingrandita',
  'gallery.position': '{i} di {total}',
  'gallery.readMemory': 'Leggi il ricordo',
  'gallery.close': 'Chiudi',
  'psaltica.schedule': 'L’orario delle lezioni',
  'psaltica.when': 'Quando',
  'psaltica.whenText': 'Da lunedì a sabato, ore 20:00 (ora svizzera)',
  'psaltica.where': 'Dove',
  'psaltica.whereText': 'Online, su Zoom',
  'psaltica.duration': 'Durata',
  'psaltica.durationText': '30 minuti',
  'psaltica.forWhom': 'Per chi',
  'psaltica.forWhomText': 'Tutti i giovani della Metropolia Ortodossa Romena dell’Europa Occidentale e Meridionale',
  'psaltica.join': 'Vuoi partecipare?',
  'psaltica.joinText':
    'Scrivici un’e-mail e ti aggiungiamo al gruppo di discussione su Telegram, dove comunichiamo tutto quello che riguarda le lezioni.',
  'psaltica.emailButton': 'Scrivici un’e-mail!',
  // --- v10: secțiunile paginii Echipa ---
  'members.intro': 'Coloro che organizzano le attività di Nepsis Svizzera.',
  'members.section.coordinators': 'I coordinatori',
  'members.section.responsabil': 'Responsabile',
  'members.section.alumni': 'Alumni',
  'members.role.diacon': 'Diacono',
};

export default it;
