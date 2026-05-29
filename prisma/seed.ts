import { PrismaClient, AvailabilityType, CustomizationInputType, SectionType } from '@prisma/client';
const prisma = new PrismaClient();

const categories = [
  ['wallets','Portefeuilles','Wallets','Assez fin pour s’oublier, assez présent pour durer.','Slim enough to forget you are carrying it.','/placeholders/wallets.svg'],
  ['notebooks','Carnets','Notebooks','Le cuir qui protège les carnets qui gardent vos pensées.','Leather that holds the notebooks that hold your thoughts.','/placeholders/notebooks.svg'],
  ['belts','Ceintures','Belts','Coupée une fois. Portée pendant des années.','Cut once. Worn for decades.','/placeholders/belts.svg'],
  ['bags','Sacs','Bags','Une présence calme pour les journées qui bougent.','A quiet presence for days that move.','/placeholders/bags.svg'],
  ['keychains','Porte-clés','Keychains','Le détail que vos mains retrouvent chaque jour.','The detail your hands find every day.','/placeholders/keychains.svg'],
  ['glasses-pouches','Étuis à lunettes','Glasses pouches','Une peau douce pour ce qui se raye facilement.','A soft skin for things that scratch easily.','/placeholders/glasses.svg']
] as const;

async function reset() {
  await prisma.emailLog.deleteMany();
  await prisma.orderItemCustomization.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.customerSnapshot.deleteMany();
  await prisma.addressSnapshot.deleteMany();
  await prisma.productCustomizationGroup.deleteMany();
  await prisma.customizationOption.deleteMany();
  await prisma.customizationGroup.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.productColor.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.pageSection.deleteMany();
  await prisma.page.deleteMany();
  await prisma.fAQEntry.deleteMany();
  await prisma.policyPage.deleteMany();
  await prisma.newsletterSubscriber.deleteMany();
  await prisma.siteSetting.deleteMany();
}

async function main() {
  await reset();

  const createdCategories: Record<string, string> = {};
  for (let i = 0; i < categories.length; i++) {
    const [slug, nameFr, nameEn, descriptorFr, descriptorEn, coverImageUrl] = categories[i];
    const c = await prisma.category.create({ data: { slug, nameFr, nameEn, descriptorFr, descriptorEn, coverImageUrl, sortOrder: i } });
    createdCategories[slug] = c.id;
  }

  const leather = await prisma.customizationGroup.create({ data: { slug: 'leather-color', labelFr: 'Couleur du cuir', labelEn: 'Leather color', inputType: CustomizationInputType.COLOR_SELECT, helpTextFr: 'Choisissez la couleur principale du cuir.', helpTextEn: 'Choose the main leather color.' } });
  const thread = await prisma.customizationGroup.create({ data: { slug: 'thread-color', labelFr: 'Couleur du fil', labelEn: 'Thread color', inputType: CustomizationInputType.COLOR_SELECT, helpTextFr: 'Optionnel, selon le modèle.', helpTextEn: 'Optional, depending on the model.' } });
  const initials = await prisma.customizationGroup.create({ data: { slug: 'initials', labelFr: 'Initiales ou monogramme', labelEn: 'Initials or monogram', inputType: CustomizationInputType.TEXT, helpTextFr: 'Texte court. Vérifiez bien l’orthographe avant validation.', helpTextEn: 'Short text. Please verify spelling before checkout.' } });
  const notebookComboAssassi = await prisma.customizationGroup.create({ data: { slug: 'notebook-combo-assassi', labelFr: 'Composition Assassi', labelEn: 'Assassi composition', inputType: CustomizationInputType.SINGLE_SELECT, helpTextFr: 'Assassi peut contenir jusqu’à 4 carnets.', helpTextEn: 'Assassi holds up to 4 notebooks.' } });
  const notebookComboFannen = await prisma.customizationGroup.create({ data: { slug: 'notebook-combo-fannen', labelFr: 'Composition Fannen', labelEn: 'Fannen composition', inputType: CustomizationInputType.SINGLE_SELECT, helpTextFr: 'Fannen peut contenir jusqu’à 6 carnets.', helpTextEn: 'Fannen holds up to 6 notebooks.' } });
  const charms = await prisma.customizationGroup.create({ data: { slug: 'charm-count', labelFr: 'Nombre de charms', labelEn: 'Number of charms', inputType: CustomizationInputType.SINGLE_SELECT, helpTextFr: 'Jusqu’à 5 charms: un charm frontal et quatre charms latéraux. Le prix se met à jour selon le nombre choisi.', helpTextEn: 'Up to 5 charms: one front charm and four side charms. Price updates based on the number selected.' } });
  const charmNotes = await prisma.customizationGroup.create({ data: { slug: 'charm-placement-notes', labelFr: 'Notes sur les charms', labelEn: 'Charm notes', inputType: CustomizationInputType.TEXTAREA, helpTextFr: 'Optionnel: décrivez le charm frontal, les charms latéraux ou l’ambiance souhaitée.', helpTextEn: 'Optional: describe the front charm, side charms, or the mood you want.' } });

  await prisma.customizationOption.createMany({ data: [
    { groupId: leather.id, labelFr: 'Garnet', labelEn: 'Garnet', value: 'garnet', colorHex: '#871A3B' },
    { groupId: leather.id, labelFr: 'Indigo', labelEn: 'Indigo', value: 'indigo', colorHex: '#2C1268' },
    { groupId: leather.id, labelFr: 'Umber', labelEn: 'Umber', value: 'umber', colorHex: '#271509' },
    { groupId: leather.id, labelFr: 'Cognac', labelEn: 'Cognac', value: 'cognac', colorHex: '#896038' },
    { groupId: thread.id, labelFr: 'Écru', labelEn: 'Ecru', value: 'ecru', colorHex: '#F2EBD6' },
    { groupId: thread.id, labelFr: 'Garnet', labelEn: 'Garnet', value: 'garnet', colorHex: '#871A3B' },
    { groupId: thread.id, labelFr: 'Indigo', labelEn: 'Indigo', value: 'indigo', colorHex: '#2C1268' },
    { groupId: notebookComboAssassi.id, labelFr: '2 carnets M', labelEn: '2 M notebooks', value: '2m' },
    { groupId: notebookComboAssassi.id, labelFr: '2 carnets S + 1 carnet M', labelEn: '2 S notebooks + 1 M notebook', value: '2s-1m' },
    { groupId: notebookComboAssassi.id, labelFr: '4 carnets S', labelEn: '4 S notebooks', value: '4s' },
    { groupId: notebookComboFannen.id, labelFr: '3 carnets M', labelEn: '3 M notebooks', value: '3m' },
    { groupId: notebookComboFannen.id, labelFr: '2 carnets S + 2 carnets M', labelEn: '2 S notebooks + 2 M notebooks', value: '2s-2m' },
    { groupId: notebookComboFannen.id, labelFr: '4 carnets S + 1 carnet M', labelEn: '4 S notebooks + 1 M notebook', value: '4s-1m' },
    { groupId: notebookComboFannen.id, labelFr: '6 carnets S', labelEn: '6 S notebooks', value: '6s' },
    { groupId: charms.id, labelFr: '0 charm', labelEn: '0 charms', value: '0', priceDelta: 0 },
    { groupId: charms.id, labelFr: '1 charm', labelEn: '1 charm', value: '1', priceDelta: 10 },
    { groupId: charms.id, labelFr: '2 charms', labelEn: '2 charms', value: '2', priceDelta: 20 },
    { groupId: charms.id, labelFr: '3 charms', labelEn: '3 charms', value: '3', priceDelta: 25 },
    { groupId: charms.id, labelFr: '4 charms', labelEn: '4 charms', value: '4', priceDelta: 30 },
    { groupId: charms.id, labelFr: '5 charms', labelEn: '5 charms', value: '5', priceDelta: 35 }
  ] });

  const products = [
    ['wallets','azali-card-wallet','Portefeuille Quotidien','Everyday Wallet',65,'Une pièce calme pour ce que vous touchez chaque jour.','A quiet piece for the things you reach for daily.'],
    ['wallets','azali-bifold-wallet','Portefeuille Garnet','Garnet Wallet',95,'Une pièce quotidienne coupée dans un drop limité.','A daily piece cut from a limited leather drop.'],
    ['notebooks','azali-assassi-notebook','Carnet Assassi','Assassi Notebook',75,'La pièce qui parle de vous avant vous.','The statement piece that speaks about you before you do.'],
    ['notebooks','azali-fannen-notebook','Carnet Fannen','Fannen Notebook',80,'Pour les esprits multiples, pour organiser vos pensées.','For the multitalented, to organize your thoughts.'],
    ['belts','azali-classic-belt','Ceinture Slim','Slim Belt',90,'Coupée une fois. Portée pendant des décennies.','Cut once. Worn for decades.'],
    ['bags','azali-day-bag','Sac de jour','Day Bag',280,'Une présence calme pour porter ce qui compte, sans chercher à faire du bruit.','A quiet presence for carrying what matters without asking for attention.'],
    ['keychains','azali-loop-keychain','Porte-clés Drop','Keychain Drop',25,'Un petit objet né d’un fragment de cuir.','A small object from a leather fragment.'],
    ['glasses-pouches','azali-soft-glasses-pouch','Étui Lunettes','Glasses Pouch',45,'Protection souple pour ce que vous portez chaque jour.','Soft protection for what you carry every day.']
  ] as const;

  for (let i = 0; i < products.length; i++) {
    const [categorySlug, slug, nameFr, nameEn, price, shortFr, shortEn] = products[i];
    const p = await prisma.product.create({ data: { slug, categoryId: createdCategories[categorySlug], nameFr, nameEn, shortDescriptionFr: shortFr, shortDescriptionEn: shortEn, descriptionFr: `${shortFr}\nChaque pièce est coupée, assemblée et finie à la main. Le cuir évolue avec l’usage et développe une patine unique.`, descriptionEn: `${shortEn}\nEach piece is cut, assembled, and finished by hand. Leather evolves with use and develops a unique patina.`, basePrice: price, dimensions: categorySlug === 'notebooks' ? 'Assassi ou Fannen selon modèle. Carnets S et M selon composition choisie.' : categorySlug === 'belts' ? 'Longueur ajustée à la commande.' : categorySlug === 'bags' ? 'Format jour, dimensions à confirmer selon le drop.' : 'Format compact, dimensions à confirmer selon le drop.', materialFr: 'Cuir véritable pleine fleur ou cuir de qualité issu principalement de chutes revalorisées', materialEn: 'Genuine full-grain or quality leather, mainly revived from offcuts', availabilityType: AvailabilityType.BOTH, stockQuantity: 3, leadTimeMinDays: 7, leadTimeMaxDays: 14, leadTimeTextFr: 'En stock ou fabriqué sur commande selon les options, délai estimé 7 à 14 jours.', leadTimeTextEn: 'In stock or made to order depending on options, estimated lead time 7 to 14 days.', isFeatured: i < 6, isActive: true } });
    await prisma.productImage.create({ data: { productId: p.id, url: categorySlug === 'notebooks' ? '/placeholders/notebooks.svg' : '/placeholders/product.svg', isPrimary: true, altFr: nameFr, altEn: nameEn } });
    await prisma.productColor.createMany({ data: [
      { productId: p.id, labelFr: 'Garnet', labelEn: 'Garnet', value: 'garnet', colorHex: '#871A3B' },
      { productId: p.id, labelFr: 'Indigo', labelEn: 'Indigo', value: 'indigo', colorHex: '#2C1268' },
      { productId: p.id, labelFr: 'Umber', labelEn: 'Umber', value: 'umber', colorHex: '#271509' }
    ] });
    await prisma.productCustomizationGroup.create({ data: { productId: p.id, groupId: thread.id, isRequired: false, sortOrder: 1 } });
    if (slug.includes('assassi')) {
      await prisma.productCustomizationGroup.create({ data: { productId: p.id, groupId: notebookComboAssassi.id, isRequired: true, sortOrder: 2 } });
      await prisma.productCustomizationGroup.create({ data: { productId: p.id, groupId: charms.id, isRequired: true, sortOrder: 3 } });
      await prisma.productCustomizationGroup.create({ data: { productId: p.id, groupId: charmNotes.id, isRequired: false, sortOrder: 4 } });
    }
    if (slug.includes('fannen')) {
      await prisma.productCustomizationGroup.create({ data: { productId: p.id, groupId: notebookComboFannen.id, isRequired: true, sortOrder: 2 } });
      await prisma.productCustomizationGroup.create({ data: { productId: p.id, groupId: charms.id, isRequired: true, sortOrder: 3 } });
      await prisma.productCustomizationGroup.create({ data: { productId: p.id, groupId: charmNotes.id, isRequired: false, sortOrder: 4 } });
    }
    if (categorySlug !== 'notebooks') await prisma.productCustomizationGroup.create({ data: { productId: p.id, groupId: initials.id, isRequired: false, sortOrder: 2 } });
  }

  await prisma.siteSetting.createMany({ data: [
    { key: 'shippingFee', value: { amount: 8 } },
    { key: 'contactInfo', value: { email: 'contact@azali.tn', phone: '+216 00 000 000', addressFr: 'Tunis, Tunisie', addressEn: 'Tunis, Tunisia', instagram: '', facebook: '' } },
    { key: 'hero', value: { videoUrl: '', posterUrl: '/placeholders/hero-poster.svg' } },
    { key: 'brandPalette', value: { parchment: '#F2EBD6', sand: '#C4A06E', leather: '#896038', garnet: '#871A3B', indigo: '#2C1268', umber: '#271509' } }
  ] });

  const meet = await prisma.page.create({ data: { slug: 'meet-the-artist', titleFr: 'Rencontrer l’artiste', titleEn: 'Meet the Artist' } });
  await prisma.pageSection.createMany({ data: [
    { pageId: meet.id, type: SectionType.IMAGE_TEXT, titleFr: 'La main derrière AZALI', titleEn: 'The hand behind AZALI', bodyFr: 'Je donne au cuir une seconde respiration, une forme qui continue.\n\nÉcrivez ici votre premier paragraphe: votre histoire, votre geste, votre rapport au cuir, et ce que AZALI signifie pour vous.', bodyEn: 'I give leather a second breath, a form that continues.\n\nWrite your first paragraph here: your story, your handwork, your relationship with leather, and what AZALI means to you.', imageUrl: '/placeholders/artist.svg', sortOrder: 0 },
    { pageId: meet.id, type: SectionType.TEXT_IMAGE, titleFr: 'Des objets faits pour durer', titleEn: 'Objects made to last', bodyFr: 'Ce qui mérite d’être gardé ne devrait pas être pensé comme jetable.\n\nÉcrivez ici votre deuxième paragraphe: votre vision, vos matières, votre promesse, et la façon dont chaque pièce est conçue pour durer.', bodyEn: 'What deserves to be kept should not be designed as disposable.\n\nWrite your second paragraph here: your vision, materials, promise, and how every piece is designed to last.', imageUrl: '/placeholders/workshop.svg', sortOrder: 1 }
  ] });

  const faq = [
    ['Comment passer une commande ?','How do I place an order?','Ajoutez vos pièces au panier, remplissez vos coordonnées, puis envoyez la demande. AZALI vous confirmera la commande avant préparation.','Add pieces to cart, fill in your details, then send the request. AZALI confirms your order before preparation.'],
    ['Le paiement se fait-il en ligne ?','Do I pay online?','Non. Le paiement se fait à la livraison uniquement.','No. Payment is cash on delivery only.'],
    ['Quels sont les frais de livraison ?','What is the delivery fee?','Les frais de livraison sont fixes: 8 TND par commande.','The delivery fee is fixed: 8 TND per order.'],
    ['Puis-je personnaliser mon produit ?','Can I customize my product?','Oui, selon les options disponibles sur chaque page produit. Les carnets Assassi et Fannen suivent une logique de prix selon le nombre de charms.','Yes, depending on the options available on each product page. Assassi and Fannen notebooks follow charm-count pricing.'],
    ['Pourquoi choisir du vrai cuir ?','Why choose genuine leather?','Parce qu’un bon cuir se répare, se patine et dure. AZALI privilégie les chutes de cuir et les transforme en pièces utiles plutôt que de les laisser perdre leur valeur.','Because good leather can be repaired, develops patina, and lasts. AZALI prioritizes leather offcuts and turns them into useful pieces instead of letting them lose value.']
  ];
  await prisma.fAQEntry.createMany({ data: faq.map((f, index) => ({ questionFr: f[0], questionEn: f[1], answerFr: f[2], answerEn: f[3], sortOrder: index })) });

  await prisma.policyPage.createMany({ data: [
    { slugFr: 'livraison-et-paiement', slugEn: 'delivery-and-payment', titleFr: 'Livraison & paiement', titleEn: 'Delivery & Payment', bodyFr: 'AZALI livre en Tunisie uniquement. Le paiement se fait à la livraison. Des frais fixes de 8 TND sont ajoutés à chaque commande. Les commandes sont vérifiées et confirmées avant préparation.', bodyEn: 'AZALI delivers in Tunisia only. Payment is cash on delivery. A fixed 8 TND delivery fee is added to each order. Orders are reviewed and confirmed before preparation.' },
    { slugFr: 'entretien-du-cuir', slugEn: 'leather-care', titleFr: 'Entretien du cuir', titleEn: 'Leather Care', bodyFr: 'Le cuir développe une patine avec le temps. Évitez l’eau, l’humidité prolongée, le soleil direct et les produits agressifs. Essuyez avec un chiffon doux et sec.', bodyEn: 'Leather develops patina over time. Avoid water, prolonged humidity, direct sun, and harsh chemicals. Wipe with a soft dry cloth.' },
    { slugFr: 'ethique-du-cuir', slugEn: 'leather-ethics', titleFr: 'Consommer mieux. Choisir le vrai cuir.', titleEn: 'Consume better. Choose true leather.', bodyFr: `## Réveiller ce qui existe déjà
Chez AZALI, une grande partie du cuir travaillé provient de chutes. Ces morceaux existent déjà: ils ont été coupés, oubliés ou mis de côté par d’autres productions. Mon travail consiste à leur redonner une vie, une forme et une utilité.

## Comprendre la matière
Le cuir est un sous-produit de l’industrie alimentaire. Il n’est pas fabriqué à partir de zéro pour devenir un accessoire: la peau existe parce que l’animal est déjà entré dans la filière viande. Le tannage transforme cette matière en quelque chose de durable au lieu de la laisser perdre sa valeur.

## Acheter moins, garder plus longtemps
Le cuir n’est pas parfait: le tannage, le transport et la production ont un impact. Mais une pièce en vrai cuir, bien conçue et bien entretenue, peut remplacer plusieurs objets fragiles ou synthétiques. Elle se répare, se nourrit, se patine et se garde.

## Ne confondez pas cuir et similicuir
Le similicuir peut sembler plus simple, mais il est souvent composé de matières plastiques, se fissure plus vite, vieillit mal et finit plus rapidement comme déchet. Choisir du vrai cuir, surtout lorsqu’il revalorise des chutes, c’est choisir moins d’objets, mieux faits, avec une vraie durée de vie.

## Le choix AZALI
Ne pas surproduire. Ne pas jeter ce qui peut encore devenir beau. Créer des pièces qui méritent d’être gardées.`, bodyEn: `## Revive what already exists
At AZALI, much of the leather I work with comes from offcuts. These pieces already exist: they were cut, forgotten, or set aside by other productions. My work is to give them another life, another form, and a real use.

## Understand the material
Leather is a byproduct of the food industry. It is not manufactured from nothing to become an accessory: the hide exists because the animal has already entered the meat supply chain. Tanning turns that material into something durable instead of letting it lose its value.

## Buy less, keep longer
Leather is not perfect: tanning, transport, and production have an impact. But a well-made genuine leather object, cared for and used for years, can replace several fragile or synthetic items. It can be repaired, conditioned, patinated, and kept.

## Do not confuse leather with faux leather
Faux leather may look easier, but it is often made with plastic-based materials, cracks faster, ages poorly, and becomes waste sooner. Choosing true leather, especially when it revives offcuts, means choosing fewer objects, made better, with a longer life.

## The AZALI choice
Do not overproduce. Do not discard what can still become beautiful. Create pieces that deserve to be kept.` },
    { slugFr: 'retours-et-echanges', slugEn: 'returns-and-exchanges', titleFr: 'Retours & échanges', titleEn: 'Returns & Exchanges', bodyFr: 'Les retours ou échanges sont possibles si l’article arrive endommagé, incorrect ou défectueux. Contactez AZALI dans les 48 heures après livraison. Les pièces personnalisées ne sont pas retournables sauf erreur ou défaut.', bodyEn: 'Returns or exchanges are possible if the item arrives damaged, incorrect, or defective. Contact AZALI within 48 hours after delivery. Personalized pieces are not returnable unless there is an error or defect.' },
    { slugFr: 'confidentialite', slugEn: 'privacy', titleFr: 'Confidentialité', titleEn: 'Privacy Policy', bodyFr: 'AZALI collecte uniquement les informations nécessaires au traitement des commandes: nom, téléphone, email, adresse et détails de commande. Aucune donnée de carte bancaire n’est collectée.', bodyEn: 'AZALI only collects information needed to process orders: name, phone, email, address, and order details. No card payment data is collected.' },
    { slugFr: 'conditions', slugEn: 'terms', titleFr: 'Conditions générales', titleEn: 'Terms & Conditions', bodyFr: 'Les couleurs peuvent légèrement varier selon l’écran et la lumière. Chaque pièce faite main peut présenter de légères variations. Le client doit vérifier les textes de personnalisation avant validation.', bodyEn: 'Colors may vary slightly depending on screens and light. Each handmade piece may have small variations. Customers must verify personalization text before submitting.' }
  ] });
}

main().finally(async () => prisma.$disconnect());
