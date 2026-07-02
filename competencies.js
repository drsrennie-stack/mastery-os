/* ============================================================
   BIO 004 Human Anatomy, Majors Anatomy
   High-yield competency map, source of truth for Mastery OS.

   Anatomy only, no physiology (per BIO 004 scope). Clinical
   anatomy is threaded in as context, not mechanism.

   AUDITED per unit from the master structure list
   (anatomy-structure-list-systems.html). Competencies differ
   every week; each is rated for yield and estimated for time so
   the OS can pack a student's weekly budget highest-yield first.

   Fields: id, week, system, name, can, dok, yield, est(min), facets.
   yield: 'core' (must know), 'high' (important), 'support' (if time).
   Weekly budget by grade goal: A 20 h, B 16 h, C-to-pass 14 h.
   ============================================================ */
window.BIO004_COMPETENCIES = [

  /* ===================== WEEK 1: Foundations, Tissues, Integumentary ===================== */
  { id:'w1-terms', week:1, system:'Foundations', name:'Regional and directional terms', can:'Use every anterior and posterior regional term and all directional terms correctly in a sentence.', dok:2, yield:'core', est:40, facets:['lecture','draw','clinical'] },
  { id:'w1-planes-cavities', week:1, system:'Foundations', name:'Planes, cavities, and membranes', can:'Identify planes and sections, name the body cavities and the diaphragm, the mediastinum borders and contents, and the serous membranes.', dok:2, yield:'core', est:35, facets:['lecture','imaging','clinical'] },
  { id:'w1-quadrants-retro', week:1, system:'Foundations', name:'Quadrants and retroperitoneum', can:'Name the four abdominopelvic quadrants and their major organs, and list the retroperitoneal structures.', dok:2, yield:'high', est:20, facets:['lecture','clinical'] },
  { id:'w1-microscope', week:1, system:'Foundations', name:'Microscope and magnification', can:'Name the parts of the microscope and calculate total magnification.', dok:1, yield:'support', est:15, facets:['lecture'] },
  { id:'w1-epithelia', week:1, system:'Tissues', name:'Epithelial tissue identification', can:'Identify every epithelium with location, and the surface features: cilia, microvilli, goblet cells, basement membrane.', dok:3, yield:'core', est:45, facets:['histology','draw'] },
  { id:'w1-connective', week:1, system:'Tissues', name:'Connective tissue identification', can:'Identify connective tissue proper, cartilage, and osseous tissue with their key cells and fibers.', dok:3, yield:'core', est:45, facets:['histology','draw'] },
  { id:'w1-muscle-nervous-tissue', week:1, system:'Tissues', name:'Muscle and nervous tissue', can:'Distinguish skeletal, cardiac, and smooth muscle, and identify a multipolar neuron and nerve cross-section layers.', dok:2, yield:'high', est:30, facets:['histology'] },
  { id:'w1-membranes', week:1, system:'Tissues', name:'Body membranes', can:'Distinguish mucous, serous, cutaneous, and synovial membranes.', dok:1, yield:'support', est:15, facets:['lecture'] },
  { id:'w1-epidermis', week:1, system:'Integumentary', name:'Epidermis layers', can:'Order the epidermal strata deep to superficial and distinguish thick from thin skin.', dok:2, yield:'core', est:35, facets:['histology','draw','cadaver'] },
  { id:'w1-dermis', week:1, system:'Integumentary', name:'Dermis and accessory structures', can:'Identify the dermal layers, hair follicle parts, the three glands, arrector pili, and sensory receptors.', dok:2, yield:'core', est:40, facets:['histology','label','cadaver'] },
  { id:'w1-dermal-papilla', week:1, system:'Integumentary', name:'Structures in a dermal papilla', can:'Name the three structures within a dermal papilla: Meissner corpuscles, free nerve endings, capillary loops.', dok:1, yield:'high', est:15, facets:['histology'] },

  /* ===================== WEEK 2: Skeletal ===================== */
  { id:'w2-bone-histo', week:2, system:'Bone tissue', name:'Osseous tissue (osteon)', can:'Identify osteon parts: central and Volkmann canals, lacunae, canaliculi, lamellae, osteocytes.', dok:2, yield:'core', est:40, facets:['histology','draw'] },
  { id:'w2-long-bone', week:2, system:'Bone tissue', name:'Long bone gross anatomy', can:'Identify epiphysis, metaphysis, diaphysis, medullary cavity, periosteum, endosteum, articular cartilage, epiphyseal line, compact and spongy bone.', dok:2, yield:'core', est:30, facets:['cadaver','draw','label'] },
  { id:'w2-skull-bones', week:2, system:'Axial skeleton', name:'Skull bones and sutures', can:'Identify the cranial and facial bones and the four sutures.', dok:2, yield:'core', est:45, facets:['cadaver','label'] },
  { id:'w2-skull-foramina', week:2, system:'Axial skeleton', name:'Skull foramina and features', can:'Locate the major foramina, fossae, and features on all skull views, and know that the pituitary sits in the hypophyseal fossa.', dok:3, yield:'core', est:60, facets:['cadaver','label','clinical'] },
  { id:'w2-vertebrae', week:2, system:'Axial skeleton', name:'Vertebral column', can:'Identify regions and curves, C1 and C2, typical vertebral features, and identify a vertebra and its region from its features.', dok:3, yield:'core', est:45, facets:['cadaver','label'] },
  { id:'w2-thoracic-cage', week:2, system:'Axial skeleton', name:'Thoracic cage and disc', can:'Identify sternum parts, rib parts, and the intervertebral disc.', dok:2, yield:'high', est:20, facets:['cadaver','label'] },
  { id:'w2-upper-limb-bones', week:2, system:'Appendicular skeleton', name:'Pectoral girdle and upper limb bones', can:'Identify clavicle, scapula, humerus, radius, and ulna features, and the carpals in order.', dok:2, yield:'core', est:50, facets:['cadaver','label'] },
  { id:'w2-lower-limb-bones', week:2, system:'Appendicular skeleton', name:'Pelvic girdle and lower limb bones', can:'Identify the coxal bone regions and features, femur, patella, tibia, fibula, and the tarsals.', dok:2, yield:'core', est:50, facets:['cadaver','label'] },
  { id:'w2-joints-classify', week:2, system:'Joints', name:'Joint classification', can:'Classify any joint structurally, by synovial subtype, and by movement, and name the movements that occur there.', dok:3, yield:'high', est:30, facets:['clinical','lecture'] },
  { id:'w2-knee-named-joints', week:2, system:'Joints', name:'Named joints and the knee', can:'Identify the named joints and label the knee, including collateral ligaments, menisci, and cruciates.', dok:2, yield:'high', est:30, facets:['cadaver','label','clinical'] },

  /* ===================== WEEK 3: Cardiovascular, Respiratory, Regional BV/N 1 ===================== */
  { id:'cv-chambers', week:3, system:'Cardiovascular', name:'Heart chambers and septa', can:'Identify the four chambers, interatrial and interventricular septa, and relate wall thickness to chamber, on model and cadaver.', dok:2, yield:'core', est:45, facets:['cadaver','draw','lecture'] },
  { id:'cv-valves', week:3, system:'Cardiovascular', name:'Heart valves', can:'Locate the tricuspid, mitral, pulmonary, and aortic valves and the chordae tendineae and papillary muscles.', dok:2, yield:'core', est:40, facets:['cadaver','draw','clinical'] },
  { id:'cv-coronary', week:3, system:'Cardiovascular', name:'Coronary circulation', can:'Trace the right and left coronary arteries, LAD and circumflex, the cardiac veins, and the coronary sinus.', dok:3, yield:'core', est:45, facets:['cadaver','draw','clinical'] },
  { id:'cv-surfaces', week:3, system:'Cardiovascular', name:'Heart coverings and internal features', can:'Identify the pericardial layers, the heart wall layers, auricles, pectinate muscles, fossa ovalis, and trabeculae carneae.', dok:2, yield:'high', est:30, facets:['cadaver','histology','clinical'] },
  { id:'cv-conduction-anat', week:3, system:'Cardiovascular', name:'Conduction landmarks', can:'Locate the SA node, AV node, bundle of His, bundle branches, and Purkinje fibers as anatomical landmarks.', dok:1, yield:'support', est:20, facets:['lecture','draw'] },
  { id:'resp-larynx', week:3, system:'Respiratory', name:'Larynx', can:'Identify the thyroid and cricoid cartilages, laryngeal prominence, cricothyroid ligament, arytenoid cartilages, vocal cords, glottis, and epiglottis.', dok:2, yield:'core', est:30, facets:['cadaver','label'] },
  { id:'resp-tree', week:3, system:'Respiratory', name:'Trachea and bronchial tree', can:'Identify the tracheal cartilages, trachealis muscle, carina, primary, secondary, and tertiary bronchi, alveolar ducts, and alveoli.', dok:2, yield:'core', est:35, facets:['cadaver','draw','imaging'] },
  { id:'resp-lungs-pleura', week:3, system:'Respiratory', name:'Lungs and pleura', can:'Identify the lung lobes and fissures, the hilum, the parietal and visceral pleura, and the pleural cavities, right versus left.', dok:2, yield:'core', est:35, facets:['cadaver','imaging','clinical'] },
  { id:'resp-thoracic-diaphragm', week:3, system:'Respiratory', name:'Thoracic wall and diaphragm', can:'Identify the diaphragm, the intercostal muscles, and the three structures passing through the diaphragm at T8, T10, and T12.', dok:3, yield:'high', est:25, facets:['cadaver','clinical'] },
  { id:'resp-histo', week:3, system:'Respiratory', name:'Respiratory histology', can:'Identify pseudostratified ciliated epithelium and alveolar wall components on a slide.', dok:2, yield:'high', est:30, facets:['histology'] },
  { id:'bvn-great-vessels', week:3, system:'Regional BV/N 1', name:'Great vessels and aortic arch', can:'Identify the aorta and its arch branches, the pulmonary trunk and arteries, the venae cavae, and the four pulmonary veins.', dok:3, yield:'core', est:50, facets:['cadaver','draw','imaging'] },
  { id:'bvn-vessel-tunics', week:3, system:'Regional BV/N 1', name:'Blood vessel tunics', can:'Identify the tunica intima, media, and externa of an artery and a vein on a slide.', dok:2, yield:'core', est:35, facets:['histology','draw'] },
  { id:'bvn-fetal-remnants', week:3, system:'Regional BV/N 1', name:'Fetal circulation remnants', can:'Identify the fossa ovalis and ligamentum arteriosum, and trace a drop of blood through the pulmonary circuit.', dok:3, yield:'high', est:25, facets:['draw','clinical'] },

  /* ===================== WEEK 4: Muscle micro, upper limb and thoracic muscles, lymphatic, blood, Regional BV/N 2 ===================== */
  { id:'w4-sarcomere', week:4, system:'Muscle microanatomy', name:'Sarcomere and skeletal muscle histology', can:'Identify the sarcomere bands and lines and the connective wrappings, fiber, fascicle, T-tubule, triad, and sarcoplasmic reticulum.', dok:2, yield:'core', est:40, facets:['histology','draw'] },
  { id:'w4-nmj', week:4, system:'Muscle microanatomy', name:'Neuromuscular junction', can:'Identify the pre and post-synaptic components, axon terminal, synapse, and vesicles.', dok:2, yield:'high', est:25, facets:['histology','draw'] },
  { id:'w4-oia', week:4, system:'Muscle microanatomy', name:'Origin, insertion, action method', can:'For any lab muscle, give its origin, insertion, and action.', dok:3, yield:'core', est:30, facets:['cadaver','clinical'] },
  { id:'w4-chest-arm', week:4, system:'Upper limb muscles', name:'Chest and anterior arm muscles', can:'Identify pectoralis major and minor, serratus anterior, subscapularis, coracobrachialis, biceps brachii, and brachialis.', dok:2, yield:'core', est:40, facets:['cadaver','label'] },
  { id:'w4-forearm', week:4, system:'Upper limb muscles', name:'Forearm muscles by compartment', can:'Identify the anterior and posterior forearm muscles by compartment and depth.', dok:2, yield:'core', est:45, facets:['cadaver','label'] },
  { id:'w4-post-shoulder', week:4, system:'Upper limb muscles', name:'Posterior shoulder and rotator cuff', can:'Identify trapezius, latissimus dorsi, teres major, deltoid, rhomboids, triceps, and the four rotator cuff muscles.', dok:2, yield:'core', est:40, facets:['cadaver','label'] },
  { id:'w4-blood-smear', week:4, system:'Blood', name:'Blood formed elements', can:'Identify the five leukocytes, erythrocytes, and thrombocytes on a smear and give each function.', dok:2, yield:'core', est:35, facets:['histology'] },
  { id:'w4-lymphatic', week:4, system:'Lymphatic', name:'Lymphatic organs', can:'Identify the spleen and the tonsils.', dok:1, yield:'support', est:15, facets:['cadaver'] },
  { id:'w4-ue-vessels', week:4, system:'Regional BV/N 2', name:'Upper extremity vessels', can:'Trace the subclavian to axillary to brachial to radial and ulnar arteries, and identify the superficial veins.', dok:3, yield:'high', est:35, facets:['cadaver','label'] },
  { id:'w4-ue-nerves', week:4, system:'Regional BV/N 2', name:'Upper extremity nerves', can:'Identify the musculocutaneous, median, ulnar, and radial nerves and their territories.', dok:3, yield:'high', est:30, facets:['cadaver','clinical'] },

  /* ===================== WEEK 5: Digestive, abdominopelvic, lower limb muscles, Regional BV/N 3 ===================== */
  { id:'w5-peritoneum', week:5, system:'Digestive', name:'Peritoneum and omenta', can:'Identify parietal and visceral peritoneum, the peritoneal cavity, retroperitoneum, and the greater and lesser omenta.', dok:2, yield:'high', est:25, facets:['cadaver'] },
  { id:'w5-stomach', week:5, system:'Digestive', name:'Stomach and esophagus', can:'Identify stomach regions, curvatures, rugae, and sphincters, plus the esophagus and salivary glands.', dok:2, yield:'core', est:35, facets:['cadaver','label'] },
  { id:'w5-small-intestine', week:5, system:'Digestive', name:'Small intestine', can:'Identify the duodenum with the major duodenal papilla, jejunum, ileum, ileocecal valve, and mesentery.', dok:2, yield:'core', est:30, facets:['cadaver','label'] },
  { id:'w5-large-intestine', week:5, system:'Digestive', name:'Large intestine', can:'Identify the cecum, appendix, colon regions and flexures, rectum, teniae coli, haustra, and anal canal.', dok:2, yield:'core', est:35, facets:['cadaver','label'] },
  { id:'w5-accessory-gi', week:5, system:'Digestive', name:'Accessory organs and biliary tree', can:'Identify the pancreas and its ducts, the gallbladder, the biliary tree, and the liver lobes and ligaments.', dok:3, yield:'core', est:40, facets:['cadaver','label','clinical'] },
  { id:'w5-abdominal-wall', week:5, system:'Abdominopelvic muscles', name:'Abdominal wall muscles', can:'Identify rectus abdominis and the three flat abdominal muscles.', dok:2, yield:'high', est:25, facets:['cadaver','label'] },
  { id:'w5-thigh', week:5, system:'Lower limb muscles', name:'Thigh muscles', can:'Identify the anterior, medial, and lateral thigh muscles, the IT band, and the quadriceps components.', dok:2, yield:'core', est:45, facets:['cadaver','label'] },
  { id:'w5-gluteal-hamstring', week:5, system:'Lower limb muscles', name:'Gluteal and posterior thigh', can:'Identify the glutei and the three hamstrings.', dok:2, yield:'core', est:35, facets:['cadaver','label'] },
  { id:'w5-leg', week:5, system:'Lower limb muscles', name:'Leg muscles', can:'Identify the anterior, lateral, and posterior leg muscles.', dok:2, yield:'core', est:40, facets:['cadaver','label'] },
  { id:'w5-abd-vessels', week:5, system:'Regional BV/N 3', name:'Abdominal and lower limb vessels', can:'Trace the abdominal aorta branches and the hepatic portal system, and identify the femoral and great saphenous vessels.', dok:3, yield:'high', est:40, facets:['cadaver','label'] },

  /* ===================== WEEK 6: Urinary, Reproductive, Endocrine ===================== */
  { id:'w6-kidney-gross', week:6, system:'Urinary', name:'Kidney gross anatomy', can:'Identify the cortex, medulla, columns, pyramids, calyces, pelvis, sinus, ureter, bladder, and urethra.', dok:2, yield:'core', est:40, facets:['cadaver','label','draw'] },
  { id:'w6-nephron', week:6, system:'Urinary', name:'Nephron and renal corpuscle', can:'Identify the glomerulus, Bowman capsule, the tubule segments, and the collecting duct, and trace filtrate to the outside.', dok:3, yield:'core', est:45, facets:['histology','draw'] },
  { id:'w6-renal-vessels', week:6, system:'Urinary', name:'Renal vasculature', can:'Trace blood from the renal artery through the arcuate and cortical radiate arteries to the afferent and efferent arterioles and peritubular capillaries.', dok:3, yield:'high', est:25, facets:['draw'] },
  { id:'w6-male-repro', week:6, system:'Reproductive', name:'Male reproductive anatomy', can:'Identify the testis, spermatic cord contents, duct system, accessory glands, and penis regions, and trace sperm to the outside.', dok:3, yield:'core', est:40, facets:['cadaver','label'] },
  { id:'w6-female-repro', week:6, system:'Reproductive', name:'Female reproductive anatomy', can:'Identify the ovary and ligaments, uterine tubes, uterus regions and layers, vagina, and vulva.', dok:2, yield:'core', est:40, facets:['cadaver','label'] },
  { id:'w6-endocrine', week:6, system:'Endocrine', name:'Endocrine glands', can:'Locate the pituitary, pineal, thyroid, adrenal glands, and pancreatic islets on the regional models.', dok:1, yield:'high', est:25, facets:['cadaver','label'] },

  /* ===================== WEEK 7: Head and neck muscles, CNS brain, CSF and meninges ===================== */
  { id:'w7-facial-mastication', week:7, system:'Head and neck muscles', name:'Facial expression and mastication', can:'Identify the muscles of facial expression and mastication.', dok:2, yield:'core', est:45, facets:['cadaver','label','clinical'] },
  { id:'w7-neck-eom', week:7, system:'Head and neck muscles', name:'Neck and extraocular muscles', can:'Identify the platysma, sternocleidomastoid, the hyoid muscles, and the extraocular muscles.', dok:2, yield:'high', est:30, facets:['cadaver','label'] },
  { id:'w7-cerebrum', week:7, system:'CNS brain', name:'Cerebrum surface and deep structures', can:'Identify the gyri and sulci, lobes, corpus callosum, thalamus, hypothalamus, and related deep structures.', dok:2, yield:'core', est:50, facets:['cadaver','label','draw'] },
  { id:'w7-brainstem', week:7, system:'CNS brain', name:'Brainstem and cerebellum', can:'Identify the midbrain, pons, medulla, olive, pyramids, and cerebellum.', dok:2, yield:'core', est:35, facets:['cadaver','label'] },
  { id:'w7-functional-areas', week:7, system:'CNS brain', name:'Functional cortical areas', can:'Locate Broca area, Wernicke area, and the primary motor and sensory cortices.', dok:2, yield:'high', est:20, facets:['lecture','clinical'] },
  { id:'w7-meninges', week:7, system:'Meninges and CSF', name:'Meninges and dural folds', can:'Identify the three meninges, the dural folds, and the dural venous sinuses, and know what each fold separates.', dok:2, yield:'core', est:30, facets:['cadaver','label','clinical'] },
  { id:'w7-ventricles-csf', week:7, system:'Meninges and CSF', name:'Ventricles and CSF flow', can:'Identify the ventricles, choroid plexus, foramina, and aqueduct, and trace CSF from the lateral ventricles to reabsorption.', dok:3, yield:'core', est:35, facets:['draw','clinical'] },

  /* ===================== WEEK 8: Spinal cord, peripheral and cranial nerves, plexuses, integration (cumulative) ===================== */
  { id:'w8-spinal-gross', week:8, system:'Spinal cord', name:'Spinal cord gross anatomy', can:'Identify the meninges, enlargements, conus medullaris, cauda equina, and filum terminale.', dok:2, yield:'core', est:30, facets:['cadaver','label'] },
  { id:'w8-spinal-xsection', week:8, system:'Spinal cord', name:'Spinal cord cross section', can:'Identify the horns, grey and white matter, grey commissure, and central canal.', dok:2, yield:'core', est:30, facets:['histology','draw'] },
  { id:'w8-spinal-nerve', week:8, system:'Peripheral nerves', name:'Spinal nerve components', can:'Identify the roots, dorsal root ganglion, rami, rami communicantes, and sympathetic chain, and know what each carries.', dok:3, yield:'core', est:35, facets:['draw','clinical'] },
  { id:'w8-plexuses', week:8, system:'Peripheral nerves', name:'Plexuses and major nerves', can:'Identify the four plexuses and the femoral, sciatic, tibial, common fibular, and phrenic nerves.', dok:3, yield:'core', est:40, facets:['cadaver','clinical'] },
  { id:'w8-cranial-nerves', week:8, system:'Cranial nerves', name:'Cranial nerves I to XII', can:'Identify all twelve cranial nerves, classify each as sensory, motor, or both, and give the function.', dok:3, yield:'core', est:45, facets:['cadaver','clinical'] },
  { id:'w8-ans', week:8, system:'Integration', name:'Autonomic nervous system', can:'Distinguish the sympathetic and parasympathetic anatomical landmarks.', dok:2, yield:'high', est:25, facets:['lecture','clinical'] },
  { id:'w8-integration', week:8, system:'Integration', name:'Cumulative integration', can:'Integrate structures across systems to reason through a clinical scenario.', dok:3, yield:'high', est:30, facets:['clinical','draw'] }
];
