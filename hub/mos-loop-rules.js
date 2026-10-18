/* ============================================================
   Mastery OS, mos-loop-rules.js
   WHICH COMPETENCY EACH LOOP STATION COUNTS TOWARD.

   tools/build-anatomy-data.js matches every Loop station to a
   competency in this order:
     1. the Digital Atlas: a pin with the same structure name, run
        through atlas-competency-map.js (Dr. Rennie's own rules)
     2. the same Atlas rules applied to the station's name
     3. the competency's own name or can-do statement naming the structure
     4. the rules below, for stations the Atlas does not cover yet

   Each rule: loops it applies to ('*' for any), a pattern tested on the
   station's answer, and the competency it counts toward. The first rule
   that matches wins. A station that matches nothing counts as practice
   only. That is on purpose: it never credits every competency in a Loop.

   To change one, edit the pattern or competency id here and rebuild.
   Left out on purpose, as in atlas-competency-map.js: triceps and
   anconeus (no posterior arm competency), psoas and iliacus, motor end
   plate, and nerves listed only for the muscles they supply.
   ============================================================ */
(function (root) {
  var R = [
    /* Introduction */
    ['intro', /mediastinum|thymus/i, 'w1-mediastinum'],
    ['intro', /cavity|1st rib/i, 'w1-body-cavities'],
    ['intro', /^[A-Za-z]+(al|ar|ic)( \([A-Za-z]+\))?$/, 'w1-regional-terms'],
    /* Tissues */
    ['tissues,tissues-2,muscletissue', /epitheli|goblet/i, 'w1-epithelial-id'],
    ['tissues,tissues-2', /connective|cartilage|bone|areolar|adipose|eosinophil|basophil|neutrophil|lymphocyte|monocyte|thrombocyte|platelet|erythrocyte/i, 'w1-connective-id'],
    ['tissues,tissues-2', /muscle/i, 'w1-muscle-tissue-id'],
    ['tissues,tissues-2', /nervous|neuron|gray matter|grey matter|horn/i, 'w1-nervous-tissue-id'],
    ['skin', /keratin/i, 'w1-epidermal-strata'],
    /* Bone tissue, cartilage, long bone */
    ['bone,boneaxial2', /lamell|haversian|volkmann|osteon|central canal|lacuna|compact bone|spongy bone/i, 'w2-compact-spongy'],
    ['bone,boneaxial2', /cartilage|growth plate|intervertebral disc|menisc|pubic symphysis/i, 'w2-cartilage-types'],
    ['bone,boneaxial2', /periosteum|endosteum|epiphys|sharpey/i, 'w2-long-bone-gross'],
    /* Skull */
    ['skull,boneaxial2', /suture|fontanel/i, 'w2-sutures-fontanelles'],
    ['skull,boneaxial2', /foram|fissure|meatus|canal/i, 'w2-skull-foramina'],
    ['skull,boneaxial2', /choana/i, 'w2-skull-cavities'],
    ['skull,boneaxial2', /cornu|process|line|spine|protuberance|plate|crest|condyle|fossa|notch|tubercle|galli|glabella|wing|sella/i, 'w2-skull-markings'],
    ['skull,boneaxial2', /bone|maxilla|vomer|mandible|^occipital$|^zygomatic$/i, 'w2-skull-bones'],
    /* Vertebrae and thoracic cage */
    ['boneaxial2', /facet|vertebra|lamina|pedicle|spinous|transverse process/i, 'w2-typical-vertebra'],
    ['boneaxial2', /clavicle/i, 'w2-pectoral-girdle'],
    /* Appendicular stations naming two bones */
    ['appendicular', /metatarsal|tarsal|calcane|talus/i, 'w2-foot-bones'],
    ['appendicular', /metacarpal|carpal|scaphoid|lunate/i, 'w2-hand-bones'],
    ['appendicular', /radius|ulna|humer/i, 'w2-arm-forearm'],
    /* Upper limb vessels and nerves */
    ['muscles-upper,cadaver-ue,forearm-cadaver', /median nerve|ulnar nerve|musculocutaneous|radial nerve|axillary nerve/i, 'w4-lab-ue-nerves'],
    ['muscles-upper,cadaver-ue,forearm-cadaver', /artery|vein/i, 'w4-lab-ue-arteries-veins'],
    ['forearm-cadaver,muscles-upper', /retinaculum/i, 'w4-lab-forearm-compartments'],
    ['*', /sternocleidomastoid/i, 'w7-lab-neck'],
    /* Trunk and lower limb */
    ['muscles-lower,esophagus,respiratory', /diaphragm|intercostal|phrenic|^at t(8|10|12)|t10 \(esophagus/i, 'resp-thoracic-diaphragm'],
    ['upper-leg-cadaver,lower-leg-cadaver', /pectineus/i, 'w5-lab-thigh-gluteal'],
    ['upper-leg-cadaver,abdominal-fascia', /quadratus lumborum|transvers/i, 'w5-lab-abdominal-wall'],
    ['upper-leg-cadaver,lower-leg-cadaver', /popliteus/i, 'w5-lab-leg-muscles'],
    ['upper-leg-cadaver,lower-leg-cadaver', /vein|artery|nerve/i, 'w5-lab-lower-limb-vessels-nerves'],
    /* Muscle */
    ['microanatomy', /muscle cell|fiber|mitochondri/i, 'w4-muscle-fiber-parts'],
    ['muscletissue', /attached to bone|heart wall/i, 'w4-muscle-tissue-types'],
    ['muscletissue,heart', /gap junction|desmosome/i, 'cv-cardiac-muscle'],
    /* Digestive */
    ['abdominal-fascia,liver,pancreas', /peritoneum|omentum/i, 'w5-peritoneum-folds'],
    ['esophagus,pharynx', /epiglottis/i, 'resp-larynx'],
    ['pharynx', /nasopharynx|oropharynx|laryngopharynx/i, 'resp-upper-tract'],
    ['stomach', /parotid|submandibular|sublingual/i, 'w5-salivary-glands'],
    ['colon', /teni|anus/i, 'w5-large-intestine'],
    ['pancreas', /plicae/i, 'w5-small-intestine'],
    ['pancreas,liver', /gall ?bladder/i, 'w5-bile-path'],
    ['pancreas', /spleen/i, 'w4-lymphatic-organs'],
    ['liver', /umbilical vein/i, 'bvn-fetal-remnants'],
    ['pancreas,liver,urinary', /aorta|vena cava|celiac|mesenteric|hepatic artery|hepatic vein|hepatic portal|portal vein|splenic|gastroduodenal|jejunal|hepatic artery proper|right hepatic artery|left hepatic artery/i, 'w5-lab-abdominal-vessels'],
    /* Urinary and reproductive */
    ['urinary', /adrenal|suprarenal/i, 'w6-adrenal'],
    ['urinary,reproductive-cadaver', /seminal vesicle|prostate/i, 'w6-male-glands-penis'],
    ['renal-micro', /loop of henle|bowman|nephron|tubule/i, 'w6-nephron-parts'],
    ['renal-micro', /vasa recta|peritubular|arteriole|capillar/i, 'w6-kidney-bloodsupply'],
    ['reproductive-cadaver', /fallopian|uterine tube/i, 'w6-ovum-path'],
    ['reproductive-cadaver', /vas deferens|ductus deferens|penile urethra/i, 'w6-sperm-path'],
    ['reproductive-cadaver', /bladder/i, 'w6-urine-path'],
    ['reproductive-cadaver', /rectum/i, 'w5-large-intestine'],
    /* Thorax and heart */
    ['respiratory,heart', /mediastinum/i, 'w1-mediastinum'],
    ['respiratory,heart', /thoracic cavity/i, 'w1-body-cavities'],
    ['respiratory', /lung/i, 'resp-lungs-pleura'],
    ['respiratory,heart', /pulmonary (arter|vein)|brachiocephalic|subclavian/i, 'bvn-great-vessels'],
    ['heart', /descending a|interventricular a|coronary/i, 'cv-coronary'],
    /* Brain and spinal cord */
    ['neuro-brain,neuro-brain-midsagittal', /tentorium|falx/i, 'w7-cranial-meninges'],
    ['neuro-brain,neuro-brain-inferior', /parahippocampal/i, 'w7-limbic-system'],
    ['neuro-brain,neuro-brain-inferior', /gyrus|cerebral cortex/i, 'w7-cerebrum-surface'],
    ['neuro-brain-midsagittal', /septum pellucidum/i, 'w7-ventricles'],
    ['neuro-brain-midsagittal', /fornix/i, 'w7-limbic-system'],
    ['neuro-brain-midsagittal', /ependymal/i, 'w7-csf-circulation'],
    ['neuro-brain-midsagittal,neuro-brain-inferior', /infundibulum|mammillary|optic chiasm|melatonin|pineal/i, 'w7-diencephalon'],
    ['neuro-brain-midsagittal,neuro-brain-inferior', /quadrigemina|colliculus|midbrain|crus cerebri/i, 'w7-midbrain'],
    ['neuro-brain-midsagittal', /pons/i, 'w7-pons'],
    ['neuro-brain-midsagittal', /medulla/i, 'w7-medulla'],
    ['neuro-brain-inferior', /olfactory|optic tract/i, 'w8-cranial-nerves'],
    ['neuro-brain-cow', /spinal artery|cerebral artery|communicating|basilar|vertebral artery/i, 'w7-circle-of-willis'],
    ['neuro-cranial-nerves,muscles-head', /^cn |cn [ivx]+|olfactory|optic|oculomotor|trochlear|trigeminal|abducens|facial|vestibulocochlear|glossopharyngeal|vagus|accessory|hypoglossal/i, 'w8-cranial-nerves'],
    ['spine', /dura|arachnoid|pia/i, 'w7-spinal-meninges-spaces'],
    ['spine', /horn|commissure/i, 'w8-cord-internal'],
    ['spine', /root/i, 'w8-cord-roots'],
    ['spine', /sympathetic chain/i, 'w8-ans-ganglia-divisions'],
    ['spine', /plexus/i, 'w8-nerve-plexuses'],
    ['spine', /ram(us|i)|spinal nerve/i, 'w8-spinal-nerves-rami']
  ];
  var api = R.map(function (r) { return { loops: r[0] === '*' ? null : r[0].split(','), re: r[1], comp: r[2] }; });
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.MOS_LOOP_RULES = api;
})(typeof window !== 'undefined' ? window : globalThis);
