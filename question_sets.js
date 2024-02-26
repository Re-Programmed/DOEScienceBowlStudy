var SelectedQSetButtons = []



var FullQuestionSet = []

function LoadSelectedFullSet()
{
    FullQuestionSet = [];

    var arr = Array.from(document.getElementsByClassName("set_option"));

    for(var i = 0; i < arr.length; i++)
    {
        if(arr[i].getAttribute("optsel") == 'true')
        {
            FullQuestionSet.push(QSets[Math.floor(arr[i].getAttribute("my_set"))]);
        }
    }

    console.log(FullQuestionSet);

    return FullQuestionSet.length > 0;
}

const QuestionSetNames = [
    '2009 Set 1, Round 1',
    '2009 Set 1, Round 2'
]

const QuestionSetCounts = [
    25,
    25
]

const QSets = [
    //2009 Set 1, Round 1
`High School Round 1 Page 1
ROUND 1
TOSS-UP
1) BIOLOGY Short Answer What is the most common term used in genetics to describe the
observable physical characteristics of an organism caused by the expression of a gene or set of
genes?
ANSWER: PHENOTYPE
BONUS
1) BIOLOGY Short Answer What is the biological term most often used for the act of a cell
engulfing a particle by extending its pseudopodia (read as: SU-doe-POH-dee-ah) around the
particle?
ANSWER: PHAGOCYTOSIS
TOSS-UP
2) CHEMISTRY Multiple Choice An aqueous solution in which the concentration of OH– ions is
greater than that of H+ ions is:
W) basic
X) acidic
Y) neutral
Z) in equilibrium
ANSWER: W) BASIC
BONUS
2) CHEMISTRY Short Answer Find the mass of 1 mole of cuprous oxide, or Cu2O. Assume the
atomic mass of copper is 64 and oxygen is 16.
ANSWER: 144
High School Round 1 Page 2
TOSS-UP
3) PHYSICS Short Answer What property of a sound wave is most commonly associated with
loudness?
ANSWER: AMPLITUDE
BONUS
3) PHYSICS Short Answer What is the MOST common term for the behavior of light where it
appears to bend around small obstacles or the spreading out of waves as light passes through
pinholes or slits?
ANSWER: DIFFRACTION
TOSS-UP
4) MATH Short Answer What term BEST describes 2 angles with 90º as the sum of their
measurements?
ANSWER: COMPLEMENTARY
BONUS
4) MATH Short Answer Divide the following and give your answer in scientific notation:
(8 * 10^7) / (4 * 10^4)^(1/2)
ANSWER: 4 * 10^5
High School Round 1 Page 3
TOSS-UP
5) EARTH SCIENCE Multiple Choice The overall charge at the top and bottom, respectively, of a
towering cumulonimbus cloud during a thunderstorm is:
W) positive, positive
X) positive, negative
Y) negative, positive
Z) negative, negative
ANSWER: X) POSITIVE, NEGATIVE
BONUS
5) EARTH SCIENCE Multiple Choice A lightning bolt is seen and its accompanying thunder is
heard 15 seconds later. This means the storm is most likely how many miles away:
W) 3
X) 6
Y) 9
Z) 15
ANSWER: W) 3
TOSS-UP
6) GENERAL SCIENCE Short Answer How many significant figures are in the number 0.00750?
ANSWER: 3
BONUS
6) GENERAL SCIENCE Short Answer Subtract the following 2 numbers and give your answer
with the proper significant figures: 25.101 – 0.9608
ANSWER: 24.140
High School Round 1 Page 4
TOSS-UP
7) ASTRONOMY Short Answer What is the proper name of the star that is most commonly noted
to have coordinates closest to the north celestial pole?
ANSWER: NORTH STAR (ACCEPT: POLARIS or ALPHA URSA MINORIS)
BONUS
7) ASTRONOMY Short Answer What is the most well-known asterism in Ursa Major?
ANSWER: BIG DIPPER
TOSS-UP
8) BIOLOGY Multiple Choice Human epidermis is mostly composed of which of the following
basic animal tissues types:
W) epithelial
X) connective
Y) nervous
Z) muscle
ANSWER: W) EPITHELIAL
BONUS
8) BIOLOGY Short Answer What are the 2 basic categories of lymphocyte cells?
ANSWER: T AND B (ACCEPT: B AND T OR T AND B CELLS OR B AND T CELLS)
High School Round 1 Page 5
TOSS-UP
9) CHEMISTRY Short Answer What general type of bonding is found in molecules in which
electrons are shared by nuclei?
ANSWER: COVALENT
BONUS
9) CHEMISTRY Short Answer Name all of the following 4 processes where latent heat is
absorbed: evaporation; condensation; water melts; water freezes
ANSWER: EVAPORATION; WATER MELTS
TOSS-UP
10) PHYSICS Short Answer Although not known as such at the time, what was the first form of
spectacular electric discharge seen by humans?
ANSWER: LIGHTNING
BONUS
10) PHYSICS Multiple Choice A constant force acting on a body experiencing no change in its
environment will give the body:
W) constant acceleration
X) constant speed
Y) constant velocity
Z) zero acceleration
ANSWER: W) CONSTANT ACCELERATION
High School Round 1 Page 6
TOSS-UP
11) MATH Short Answer Simplify the following expression, where a is not equal to zero if b = 0
or if b = –1: a^(b^2)(a^b)
ANSWER: a^(b^2+b)
BONUS
11) MATH Short Answer Giving your answer in inches and in simplest radical form, if the
hypotenuse of a 45-45-90º triangle is 10 inches, find the length of the other sides:
ANSWER: 5sqrt(2) (ACCEPT: 5*2^(1/2) OR 5*sqrt(2) )
TOSS-UP
12) EARTH SCIENCE Multiple Choice Which of the following is a sedimentary rock:
W) slate
X) marble
Y) basalt
Z) sandstone
ANSWER: Z) SANDSTONE
BONUS
12) EARTH SCIENCE Multiple Choice Which of the following is LEAST accurate about
minerals:
W) calcite has a hardness of 3 on most of its surfaces but a hardness of 4 along the crystal face
perpendicular to its long axis
X) the Moh’s scale measures the absolute hardness of minerals
Y) a mineral’s chemical composition largely determines its crystal shape and cleavage pattern
Z) a mineral’s color is the same as its streak
ANSWER: Z) A MINERAL’S COLOR IS THE SAME AS ITS STREAK
High School Round 1 Page 7
TOSS-UP
13) GENERAL SCIENCE Multiple Choice Which of the following is closest to the meaning of the
suffix ‘lith’:
W) outside
X) stone
Y) side
Z) surface
ANSWER: X) STONE
BONUS
13) GENERAL SCIENCE Short Answer Rounded to the nearest whole number, how many feet
does light travel in one-billionth of one second?
ANSWER: 1
TOSS-UP
14) ASTRONOMY Short Answer What star has the greatest apparent magnitude?
ANSWER: SUN
BONUS
14) ASTRONOMY Short Answer What planet is known to be most like Earth in size and density?
ANSWER: VENUS
High School Round 1 Page 8
TOSS-UP
15) BIOLOGY Short Answer How many embryonic seed leaves does a bean seedling have?
ANSWER: 2
BONUS
15) BIOLOGY Short Answer Name all of the following 5 plants that are dicots:
wheat; geranium; garlic; bamboo; rose
ANSWER: GERANIUM; ROSE
TOSS-UP
16) CHEMISTRY Multiple Choice Which of the following is a metallic element, composes about
5% of the Earth’s crust, oxidizes very easily, and when pure is a dark, silver-grey metal:
W) cobalt
X) nickel
Y) iron
Z) titanium
ANSWER: Y) IRON
BONUS
16) CHEMISTRY Short Answer In general, metals are relatively hard except for what group of
metals in the Periodic Table?
ANSWER: ONE (ACCEPT: GROUP 1A or ALKALI METALS)
High School Round 1 Page 9
TOSS-UP
17) PHYSICS Multiple Choice Upon which of the following does the mass of a body MOST
directly depend:
W) its magnetic properties
X) how much volume it has
Y) the amount of matter it contains
Z) its location
ANSWER: Y) THE AMOUNT OF MATTER IT CONTAINS
BONUS
17) PHYSICS Multiple Choice Mary and Joe are on a merry-go-round. Mary is seated near the
center of rotation and Joe is on the outer edge. Which of the following BEST describes their motion:
W) Mary has a greater acceleration than Joe
X) Joe has a greater acceleration than Mary
Y) neither Mary nor Joe are accelerating
Z) both Mary and Joe have the same acceleration
ANSWER: X) JOE HAS A GREATER ACCELERATION THAN MARY
TOSS-UP
18) MATH Short Answer Giving your answer in terms of π and in inches, what is the arc-length of
a semi-circle whose diameter is 18 inches?
ANSWER: 9pi
(Solution: C = πd; ½(18π) = 9π)
BONUS
18) MATH Short Answer What is the area, in square feet, of a triangle whose perpendicular height
is 20 feet with a base of 12 feet?
ANSWER: 120
(Solution: A = ½ bh = ½ (12)(20) = 120 ft2
)
High School Round 1 Page 10
TOSS-UP
19) EARTH SCIENCE Multiple Choice Which of the following terms best describes the albedo of
a planet:
W) electromagnetic energy
X) density
Y) reflectivity
Z) absorption
ANSWER: Y) REFLECTIVITY
BONUS
19) EARTH SCIENCE Multiple Choice Which of the following is NOT true of what occurs during
an equinox:
W) equal length of day and night except at the poles
X) the Earth is not tilted with respect to the ecliptic
Y) the Sun is directly overhead at the equator
Z) the Moon is directly overhead at the poles
ANSWER: Z) THE MOON IS DIRECTLY OVERHEAD AT THE POLES
TOSS-UP
20) GENERAL SCIENCE Short Answer What gas is most directly responsible for the bends or
decompression sickness that divers may experience?
ANSWER: NITROGEN (ACCEPT: N2)
BONUS
20) GENERAL SCIENCE Short Answer In degrees Celsius to the nearest whole number, what is
the normal core body temperature of a human being?
ANSWER: 37
High School Round 1 Page 11
TOSS-UP
21) ASTRONOMY Short Answer What is the declination of the north celestial pole?
ANSWER: 90 (ACCEPT: +90)
BONUS
21) ASTRONOMY Short Answer The Sagittarius Arm is part of what galaxy?
ANSWER: THE MILKY WAY
TOSS-UP
22) BIOLOGY Multiple Choice If a plant had a taproot, it would also most likely have:
W) parallel leaf venation
X) two cotyledons in its seedling stage
Y) diffusely arranged vascular bundles in its stem
Z) no stomata on the upper surfaces of its leaves
ANSWER: X) TWO COTYLEDONS IN ITS SEEDLING STAGE
BONUS
22) BIOLOGY Short Answer Using the traditional system of classification, when organisms
belong to the same class, name all of the following 4 taxonomic categories to which they must also
belong: order; family; phylum; kingdom
ANSWER: PHYLUM; KINGDOM
High School Round 1 Page 12
TOSS-UP
23) CHEMISTRY Short Answer According to standard chemical nomenclature and indicating the
proper charge, what is the formula for hydrogen sulfide?
ANSWER: H2S
BONUS
23) CHEMISTRY Short Answer Of the following group of 4 cations, which are the LARGEST
and SMALLEST ions, respectively: K+
; Na+
; Rb+
; Li+
ANSWER: Rb+, Li+ (ACCEPT: RUBIDIUM AND LITHIUM)
TOSS-UP
24) PHYSICS Multiple Choice Martin is swinging a yo-yo in a large room with a circular motion
perpendicular to a level floor. If the yo-yo breaks away from its string at the top of the yo-yo’s
circular path, in what direction will the yo-yo initially move:
W) at an angle between horizontal and vertical
X) straight up, toward the ceiling
Y) straight down, to the floor
Z) horizontally, tangent to its original circular path
ANSWER: Z) HORIZONTALLY, TANGENT TO ITS ORIGINAL CIRCULAR PATH
BONUS
24) PHYSICS Short Answer What is the BEST term for the tendency of any mass at rest to remain
at rest?
ANSWER: INERTIA
High School Round 1 Page 13
TOSS-UP
25) BIOLOGY Short Answer What is the genus name of the most thoroughly studied bacterium?
ANSWER: Escherichia
BONUS
25) BIOLOGY Short Answer Name all of the following 3 processes that do NOT occur in E. coli:
glycolysis; photosynthesis; glycogenolysis (read as: GLYKO-jen-oh-LY-sis)
ANSWER: PHOTOSYNTHESIS`,













//2009 Set 1, Round 2
` High School Round 2 Page 1
ROUND 2
TOSS-UP
1) CHEMISTRY Short Answer What is the scientific term for the ratio between the density of a
given substance to that of water when both are at the same temperature?
ANSWER: SPECIFIC GRAVITY (ACCEPT: RELATIVE DENSITY)
BONUS
1) CHEMISTRY Multiple Choice Which of the following pure substances has the highest melting
point at 1 atmosphere of pressure:
W) magnesium oxide
X) diamond
Y) sodium chloride
Z) cesium chloride
ANSWER: X) DIAMOND
(Solution: MgO = 2800ºC; diamond = 3550ºC; NaCl = 801ºC; Cs = 645ºC)
TOSS-UP
2) BIOLOGY Short Answer What is the MOST common anatomical synonym for ventral, when
locating a part of the human body in relation to another part?
ANSWER: ANTERIOR
BONUS
2) BIOLOGY Short Answer What are the names for the pyrimidine bases found in DNA?
ANSWER: CYTOSINE; THYMINE
 High School Round 2 Page 2
TOSS-UP
3) PHYSICS Short Answer According to one of the most common color triangles, if blue and
green are primary colors, what is the third primary color?
ANSWER: RED
BONUS
3) PHYSICS Short Answer What is the most common name for the pattern of light and dark lines
produced when coherent light is passed through two horizontal slits in a thin opaque sheet, causing
superposition of waves projected on a wall?
ANSWER: INTERFERENCE PATTERN (ACCEPT: INTERFERENCE)
TOSS-UP
4) MATH Short Answer What is the smaller of two integers whose sum is 19 and whose product is
48?
ANSWER: 3
(Solution: 16 + 3 = 19; 16 × 3 = 48)
BONUS
4) MATH Multiple Choice Which of the following numbers is evenly divisible by both 11 and 3:
W) 7791
X) 7553
Y) 5181
Z) 8769
ANSWER: Y) 5181
 High School Round 2 Page 3
TOSS-UP
5) EARTH SCIENCE Multiple Choice Which of the following is best classified as a plutonic
intrusive rock:
W) obsidian
X) granite
Y) basalt
Z) pumice
ANSWER: X) GRANITE
BONUS
5) EARTH SCIENCE Multiple Choice The principle constituent of most granites is:
W) feldspar
X) muscovite
Y) calcite
Z) dolomite
ANSWER: W) FELDSPAR
TOSS-UP
6) GENERAL SCIENCE Multiple Choice The related quantities charted on a line graph are most
often called:
W) results
X) lines
Y) sets
Z) variables
ANSWER: Z) VARIABLES
BONUS
6) GENERAL SCIENCE Short Answer How many grams of sodium chloride is in 2,000 milliliters
of 0.9% NaCl solution?
ANSWER: 18
(Solution: 0.9g/100 mL × 2000 mL = 18.0 g)
 High School Round 2 Page 4
TOSS-UP
7) ASTRONOMY Short Answer What basic force of the universe is most responsible for holding
the planets of our solar system in their orbits?
ANSWER: GRAVITY
BONUS
7) ASTRONOMY Short Answer What are the proper names of the 5 celestial bodies called
wanderers by Greek astronomers because they had unusual paths in the sky throughout the year?
ANSWER: MERCURY; VENUS; MARS; JUPITER; SATURN (in any order)
TOSS-UP
8) CHEMISTRY Multiple Choice Group 1 cations and group 7 anions combine to form:
W) metal alloys
X) alkali halides
Y) alkaloids
Z) organometallic compounds
ANSWER: X) ALKALI HALIDES
BONUS
8) CHEMISTRY Short Answer Give the chemical name for the compound formed when pure iron
and pure sulfur are mixed together and heated:
ANSWER: IRON SULFIDE (ACCEPT: IRON(II) SULFIDE or FERROUS SULFIDE)
 High School Round 2 Page 5
TOSS-UP
9) BIOLOGY Short Answer From what chamber of the human heart does blood carried by the left
pulmonary artery leave?
ANSWER: RIGHT VENTRICLE
BONUS
9) BIOLOGY Short Answer What human gland or organ produces tri-iodothyronine (read as:
TRY- I-OH-doh-THY-row-neen)?
ANSWER: THYROID
TOSS-UP
10) PHYSICS Short Answer A white-colored object illuminated by a green light will appear as
what color to the human eye?
ANSWER: GREEN
BONUS
10) PHYSICS Multiple Choice A child learns that mixing approximately equal amounts of the
paint colors orange and green produces brown. This is an example of:
W) additive color mixing
X) summative color generation
Y) subtractive color synthesis
Z) neutral coloration
ANSWER: Y) SUBTRACTIVE COLOR SYNTHESIS
 High School Round 2 Page 6
TOSS-UP
11) MATH Multiple Choice One-fifth of 0.04% is equal to:
W) 8 * 10^-2
X) 8 * 10^–3
Y) 8 * 10^–4
Z) 8 * 10^–5
ANSWER: Z) 8 * 10^–5
(Solution: (0.2)(0.0004) = 0.00008)
BONUS
11) MATH Short Answer Find the prime factorization of 240:
ANSWER: 2 * 2 * 2 * 2 * 3 * 5 (ACCEPT: 24 * 3 * 5)
TOSS-UP
12) EARTH SCIENCE Multiple Choice When spreading centers reach above the ocean’s surface,
they typically form which of the following types of volcanoes:
W) shield
X) composite
Y) stratovolcano
Z) cinder cone
ANSWER: W) SHIELD
BONUS
12) EARTH SCIENCE Multiple Choice Mount Vesuvius in Italy is a typical:
W) mud volcano
X) caldera
Y) cinder cone
Z) composite volcano
ANSWER: Z) COMPOSITE VOLCANO
 High School Round 2 Page 7
TOSS-UP
13) GENERAL SCIENCE Short Answer The fertilizer potash provides plants with what element
necessary for healthy growth and which is also the seventh most abundant element on Earth?
ANSWER: POTASSIUM (ACCEPT: K)
BONUS
13) GENERAL SCIENCE Short Answer From what protein is gelatin, which is used as a food
additive, most commonly derived?
ANSWER: COLLAGEN
TOSS-UP
14) ASTRONOMY Short Answer First proposed by Georges Lemaitre, what is the name, most
likely coined by Fred Hoyle, for the theory that the universe originated at a finite time many eons
ago from an extremely compressed hot state?
ANSWER: BIG BANG
BONUS
14) ASTRONOMY Short Answer In what constellation is the star Polaris found?
ANSWER: URSA MINOR (DO NOT ACCEPT: LITTLE DIPPER)
 High School Round 2 Page 8
TOSS-UP
15) CHEMISTRY Short Answer What is the pH of a solution with a pOH of 6.8 at 25ºC?
ANSWER: 7.2
BONUS
15) CHEMISTRY Multiple Choice Which of the following substances is water soluble:
W) ethanol
X) dichloro-methane
Y) chloroform
Z) benzene
ANSWER: W) ETHANOL
TOSS-UP
16) BIOLOGY Short Answer Yersinia, Drosophila and Homo are all what taxonomical category?
ANSWER: GENUS (ACCEPT: GENERA)
BONUS
16) BIOLOGY Short Answer From what monosaccharide is cellulose primarily composed?
ANSWER: GLUCOSE (ACCEPT: Β-D-GLUCOPYRANOSYL or D-GLUCOSE)
 High School Round 2 Page 9
TOSS-UP
17) PHYSICS Short Answer Although in many respects difficult to define, what term is MOST
often described as a push or a pull that can cause an object to accelerate?
ANSWER: FORCE
BONUS
17) PHYSICS Short Answer What is the MOST common term for the inwardly directed force
exerted on an object to keep the object moving in a circle?
ANSWER: CENTRIPETAL (ACCEPT: CENTRIPETAL FORCE)
TOSS-UP
18) MATH Short Answer Giving your answer in centimeters, what is the length of a side of a
square whose diagonal measures 12 2 centimeters?
ANSWER: 12
BONUS
18) MATH Short Answer Multiply the following 4 numbers and give your answer in scientific
notation: 30,000 * 3,000 * 30 * 0.1
ANSWER: 2.7 * 10^8
 High School Round 2 Page 10
TOSS-UP
19) EARTH SCIENCE Short Answer What is the oldest Eon on the Geological Time Scale within
which the first organisms appeared between 550 million and 3.4 billion years ago?
ANSWER: PRECAMBRIAN
BONUS
19) EARTH SCIENCE Short Answer Homo sapiens evolved during which geological era of the
Geological Time Scale?
ANSWER: CENOZOIC
TOSS-UP
20) GENERAL SCIENCE Multiple Choice Anthropogenic means:
W) generated by humans
X) created many years ago
Y) carried in primate genes
Z) harmful to elderly people
ANSWER: W) GENERATED BY HUMANS
BONUS
20) GENERAL SCIENCE Short Answer The primary anthropogenic cause of acid rain is the
emission of what 2 gases?
ANSWER: SULFUR OXIDES; NITROGEN OXIDES (in any order)
 (ACCEPT: SULFUR DIOXIDE or SO2 AND NITROGEN DIOXIDE or NO2)
(DO NOT ACCEPT: SULFURIC ACID or NITRIC ACID)
 High School Round 2 Page 11
TOSS-UP
21) ASTRONOMY Short Answer What is the primary elemental product of stellar hydrogen
fusion?
ANSWER: HELIUM
BONUS
21) ASTRONOMY Short Answer In the equatorial celestial coordinate system, what terms are
synonymous with longitude and latitude, respectively?
ANSWER: LONGITUDE = RIGHT ASCENSION; LATITUDE = DECLINATION
TOSS-UP
22) CHEMISTRY Short Answer What is the atomic number for the ground state element with the
following electron configuration: 1s2
2s2
2p5 (read as: 1, s, 2; 2, s, 2; 2, p, 5)
ANSWER: 9
BONUS
22) CHEMISTRY Short Answer How many grams of KCl, with a molar mass of 75, are needed to
make 1 liter of a 3 molar solution?
ANSWER: 225
(Solution: 1 L × (3.0 mol/L)(75 g/mol) = 225 g)
 High School Round 2 Page 12
TOSS-UP
23) MATH Short Answer Giving your answer in standard form, what is the last term in the
binomial expansion of the following: (x + y)^6
ANSWER: y^6
BONUS
23) MATH Short Answer Simplify the following expression by combining like terms:
12.03A – 4.03B – 0.03(A – 40)
ANSWER: 12A – 4.03B + 1.2
TOSS-UP
24) PHYSICS Short Answer What specific law of motion most directly implies that every action
has an equal and opposite reaction?
ANSWER: NEWTON’S THIRD LAW (ACCEPT: THIRD LAW)
BONUS
24) PHYSICS Multiple Choice Jay walks to his car and drives to the store. The trip takes 20
minutes. Jay figures how far he traveled on foot and by car and divides the distance by how long the
trip took. Which of the following BEST describes what Jay has computed:
W) total velocity
X) average acceleration
Y) average speed
Z) instantaneous velocity
ANSWER: Y) AVERAGE SPEED
 High School Round 2 Page 13
TOSS-UP
25) BIOLOGY Short Answer The sinoatrial (read as: sine-oh-AYE-tree-al) node is located in what
human organ?
ANSWER: HEART
BONUS
25) BIOLOGY Short Answer In what chamber of the human heart is the sinoatrial (read as: sineoh-AYE-tree-al) node located?
ANSWER: RIGHT ATRIUM`,









//Sample Questions Set 11 (from 2017), Round 7
`2017 Regional High School NSB® PAGE 1
ROUND 7A
TOSS-UP
1) Physics – Short Answer Two billiard balls of equal mass are travelling collinearly in opposite directions. One has a
velocity of 5 meters per second, the other has a velocity of 3 meters per second. They collide completely inelastically. In
meters per second, what is their final speed?
ANSWER: ONE (ACCEPT: 1)
BONUS
1) Physics – Short Answer A 3-volt battery is connected to two 4-ohm resistors that are connected in parallel. What is
the power, in watts, dissipated by this circuit?
ANSWER: 4.5 (ACCEPT: 9/2)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
TOSS-UP
2) Biology – Multiple Choice Sap that is used in making maple syrup is transported by what organ?
W) Epidermis
X) Xylem
Y) Phloem
Z) Pith
ANSWER: X) XYLEM
BONUS
2) Biology – Short Answer The sliding filament theory of muscle contraction primarily involves what two proteins?
ANSWER: ACTIN AND MYOSIN
2017 Regional High School NSB® PAGE 2
TOSS-UP
3) Energy – Multiple Choice Which of the following forms of energy has the lowest average cost of operation and
maintenance?
W) Solar
X) Wind
Y) Geothermal
Z) Hydro
ANSWER: W) SOLAR
BONUS
3) Energy – Multiple Choice One of the largest solar power plants in the U.S. is at Ivanpah [EYE-van-pah] in southern
California. It converts solar energy into electricity via what mechanism?
W) Molten salt contacting thermoelectrics
X) Direct photovoltaic [photo-vawl-TAY-ik] panels
Y) Photoelectrolysis to produce hydrogen gas
Z) Superheated steam through a turbine
ANSWER: Z) SUPERHEATED STEAM THROUGH A TURBINE
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
TOSS-UP
4) Chemistry – Multiple Choice What element has the highest ionization energy?
W) Hydrogen
X) Helium
Y) Lithium
Z) Beryllium
ANSWER: X) HELIUM
BONUS
4) Chemistry – Multiple Choice Which of the following compounds has the highest polarity?
W) Carbon tetrachloride
X) Dimethyl [dye-meth-il] ether [EE-thur]
Y) Boron trifluoride [tri-FLOOR-ide]
Z) Trinitrotoluene [try-nitro-TAWL-yoo-een]
ANSWER: X) DIMETHYL ETHER
2017 Regional High School NSB® PAGE 3
TOSS-UP
5) Earth and Space – Multiple Choice What is the term for a fluidized mixture of solid to semi-solid fragments and hot
expanding gases that flows under gravity down the flanks of a volcano during an eruption?
W) Pyroclastic surge
X) Lahar
Y) Pyroclastic flow
Z) Lava flow
ANSWER: Y) PYROCLASTIC FLOW
BONUS
5) Earth and Space – Short Answer Identify all of the following three locations where continental ice sheets can be
currently found: 1) Greenland; 2) North America; 3) Antarctica.
ANSWER: 1 AND 3 (accept: 1,3 or 1 3)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
TOSS-UP
6) Math – Multiple Choice Two coplanar circles have a common chord. Which of the following best describes the
quadrilateral that has as opposite vertices the centers of the two circles and the endpoints of the common chord?
W) Kite
X) Parallelogram
Y) Rhombus
Z) Square
ANSWER: W) KITE
BONUS
6) Math – Short Answer A particle’s position x at time t is defined by the equation x(t) = 2t 3 – 21t 2 + 60t – 36. At what time or times t is the particle at rest?
ANSWER: 2 AND 5 (ACCEPT: 2,5)
2017 Regional High School NSB® PAGE 4
TOSS-UP
7) Chemistry – Short Answer Rank the following three ions in terms of increasing radius:
1) Na+ [N A plus]; 2) Be2+ [B E plus two]; 3) Li+ [L I plus].
ANSWER: 2, 3, 1
BONUS
7) Chemistry – Short Answer What allotrope of phosphorus, which can be prepared by heating white phosphorus to
300 degrees Celsius in the absence of air, is composed of amorphous interlocking P4 tetrahedra?
ANSWER: RED PHOSPHORUS (ACCEPT: RED)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
TOSS-UP
8) Physics – Short Answer Most room-temperature permanent magnets are magnets due to what phenomenon that is
commonly seen in iron, nickel, and cobalt?
ANSWER: FERROMAGNETISM
BONUS
8) Physics – Short Answer An atom of uranium-235 at rest undergoes spontaneous nuclear fission to form krypton-94
and barium-141. If the barium atom moves away at 4 kilometers per second, what is the speed, to the nearest kilometer
per second, of the krypton atom?
ANSWER: 6
2017 Regional High School NSB® PAGE 5
TOSS-UP
9) Earth and Space – Multiple Choice The La Brea Tar Pits of Los Angeles, California, are famous for the quantity and
diversity of fossils of extinct Pleistocene animals. Which of the following is closest to the number of years ago that these
pits formed?
W) 40,000
X) 400,000
Y) 4,000,000
Z) 40,000,000
ANSWER: W) 40,000
BONUS
9) Earth and Space – Short Answer Identify all of the following three statements that are true regarding the waves
produced by earthquakes: 1) S waves are transverse waves; 2) S waves only travel through solids; 3) S waves travel faster
than P waves.
ANSWER: 1 AND 2
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
TOSS-UP
10) Biology – Multiple Choice Apical dominance in plants means that:
W) The apical bud stimulates vertical growth
X) The apical bud inhibits auxin production
Y) The apical bud stimulates floral development
Z) The apical bud inhibits the growth of lateral buds
ANSWER: Z) THE APICAL BUD INHIBITS THE GROWTH OF LATERAL BUDS
BONUS
10) Biology – Short Answer Identify all of the following three structures that possess a double membrane: 1) Lysosome
[LYE-soh-sohm]; 2) Nucleus; 3) Ribosome [RYE-beh-sohme].
ANSWER: 2 (ACCEPT: NUCLEUS)
2017 Regional High School NSB® PAGE 6
TOSS-UP
11) Energy – Multiple Choice Immediately after being removed from a fission reactor, spent fuel rods will be placed
where?
W) Underground
X) Underwater
Y) Reprocessing plants
Z) MOX factories
ANSWER: X) UNDERWATER
BONUS
11) Energy – Multiple Choice What are the primary mobile charge carriers in the sulfonated
fluoropolymer [floor-oh-PAWL-ih-mur] ion-exchange membranes used in commercial fuel cells?
W) Hydroxide ions
X) Sodium cations [CAT-eye-onz]
Y) Water
Z) Protons
ANSWER: Z) PROTONS
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
TOSS-UP
12) Math – Short Answer A prism with 7 faces has how many edges?
ANSWER: 15
BONUS
12) Math – Short Answer Evaluate the summation, from n = 0 to infinity, of the fraction with numerator 12 and
denominator 4n
Answer: 16
2017 Regional High School NSB® PAGE 7
TOSS-UP
13) Earth and Space – Multiple Choice Greenhouse gases build up in the atmosphere of Earth and limit the amount of
heat escaping back into space. Which of the following is not a greenhouse gas for Earth?
W) Carbon dioxide
X) Argon
Y) Nitrous oxide
Z) Methane
ANSWER: X) ARGON
BONUS
13) Earth and Space – Multiple Choice What coordinate is the celestial-sphere equivalent of latitude?
W) Declination
X) Right-ascension
Y) Altitude
Z) Zenith angle
ANSWER: W) DECLINATION
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
TOSS-UP
14) Math – Short Answer What is the log base 3 of 243?
ANSWER: 5
BONUS
14) Math – Short Answer What is the integer part of the geometric mean of 6 and 80?
ANSWER: 21
2017 Regional High School NSB® PAGE 8
TOSS-UP
15) Chemistry – Multiple Choice Which of the following statements best explains why
chloroacetic [kloro-ah-SEE-tik] acid is a stronger acid than acetic [ah-SEE-tik] acid?
W) Resonance delocalization of the conjugate base chloroacetate
X) Withdrawal of electron density by chlorine
Y) Donation of electron density by chlorine
Z) Greater electronegativity of chlorine than oxygen
ANSWER: X) WITHDRAWAL OF ELECTRON DENSITY BY CHLORINE
BONUS
15) Chemistry – Short Answer What is the name for the wavelength at which a sample's absorbance does not change
during a reaction?
ANSWER: ISOSBESTIC POINT
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
TOSS-UP
16) Energy – Short Answer Moderators in nuclear reactors are used because of their ability to absorb energy from what
particles?
ANSWER: NEUTRONS (ACCEPT: FAST NEUTRONS)
BONUS
16) Energy – Short Answer DOE researchers recently published about the development of a complex oxide alloy that,
rather than being primarily stabilized by chemical bonding, is stabilized by what state function?
ANSWER: ENTROPY
2017 Regional High School NSB® PAGE 9
TOSS-UP
17) Physics – Multiple Choice Capillary action refers to which of the following?
W) The tendency for objects to flee the center of circular motion
X) The change in frequency of a wave depending on the relative motion of the source
Y) The property by which liquids can flow against gravity
Z) The tendency for fluids to dissipate energy as heat
ANSWER: Y) THE PROPERTY BY WHICH LIQUIDS CAN FLOW AGAINST GRAVITY
BONUS
17) Physics – Short Answer What is the name of the law of electromagnetism that states that the force exerted on each
other by two charged particles is inversely proportional to the square of the distance between them?
ANSWER: COULOMB'S LAW
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
TOSS-UP
18) Biology – Short Answer Calcium ions activate muscle contraction because they move what protein from thin
filaments?
ANSWER: TROPOMYOSIN
BONUS
18) Biology – Multiple Choice Ferredoxin is an electron-transfer protein that contains which of the following?
W) Heme [heem] group
X) Iron-sulfur cluster
Y) Zinc finger
Z) Leucine [LOO-seen] zipper
ANSWER: X) IRON-SULFUR CLUSTER
2017 Regional High School NSB® PAGE 10
TOSS-UP
19) Math – Short Answer What is the slope of the line with equation 3x – 8y = –24?
ANSWER: 3/8 (ACCEPT: 0.375)
BONUS
19) Math – Short Answer A class of 16 students selects a different student of the month each month during March,
April, and May. In how many different ways can the 3 honored students be selected?
ANSWER: 3360
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
TOSS-UP
20) Biology – Short Answer What two blood-sugar-relevant hormones are secreted by the
islets [EYE-lets] of Langerhans [LAYN-gur-honz]?
ANSWER: GLUCAGON AND INSULIN
BONUS
20) Biology – Short Answer What acid is produced by parietal [pah-RYE-eht-ul] cells?
ANSWER: HYDROCHLORIC ACID (ACCEPT: HCl)
2017 Regional High School NSB® PAGE 11
TOSS-UP
21) Chemistry – Short Answer For the tri-iodide ion, what is the hybridization of the central iodine atom?
ANSWER: DSP3 (ACCEPT: SP3D)
BONUS
21) Chemistry – Short Answer Identify all of the following three compounds with dsp3 hybridized central atoms:
1) Silicon tetrafluoride [tetrah-FLOOR-ide]; 2) Sulfur hexafluoride [hex-ah-FLOOR-ide]; 3) Sulfur tetrafluoride.
ANSWER: 3
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
TOSS-UP
22) Earth and Space – Short Answer What type of tide is caused when the gravitational forces of the Sun and Moon
coincide?
ANSWER: SPRING TIDES
BONUS
22) Earth and Space – Short Answer Pahoehoe and a'a are lava flows associated with what type of magma?
ANSWER: BASALTIC (ACCEPT: MAFIC)
2017 Regional High School NSB® PAGE 12
TOSS-UP
23) Physics – Short Answer A 1000-kilogram car traveling at 15 meters per second takes a turn on a flat surface with a
radius of 50 meters. In kilo-newtons, what is the force of friction on the car?
ANSWER: 4.5
BONUS
23) Physics – Short Answer A 50-kilogram superhero is standing on a frictionless surface. He fires a 100-gram arrow
horizontally at a speed of 200 meters per second at a target. In meters per second, what is his speed afterwards?
ANSWER: 0.4 `,





//Sample Question Set 12, Round 13
`High School - Round 13A Page 1
HIGH SCHOOL - ROUND 13A
TOSS-UP
1) Energy – Multiple Choice Researchers at the DOE’s Joint Genome [JEE-nome] Institute recently
performed a transcriptomic [trans-krip-TAWN-ik] analysis on mycorrhizal [MY-koh-RYE-zul] fungi [funji] to understand their mechanisms of drought adaptation. Which of the following procedures was integral to
this analysis?
W) Measured numbers of RNAs for all of the fungal [FUN-gul] genes
X) Sequenced the fungi’s [fun-jize] DNA
Y) Measured the levels of every fungal protein
Z) Sequenced all of the fungi’s [fun-jize] proteins
ANSWER: W) MEASURED NUMBERS OF RNAS FOR ALL OF THE FUNGAL GENES
BONUS
1) Energy – Short Answer SLAC [slack] scientists recently published a surprising study in which they
discovered that applying small amounts of pressure to platinum or lithium cobalt oxide increased the
material's catalytic efficiency. Identify all of the following three devices to which this discovery is relevant:
1) Fuel cells; 2) Batteries; 3) Capacitors.
ANSWER: 1 AND 2
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
TOSS-UP
2) Physics – Multiple Choice One vector has a magnitude of six meters, and the other has a magnitude of
three meters. The magnitude of their vector product is 0.556. Which of the following is true of this system?
W) The angle between the vectors is 33.7 degrees
X) The angle between the vectors is 146.3 degrees
Y) The scalar product is 19.9 meters
Z) There is not enough information to determine the angle or the scalar product
ANSWER: Z) THERE IS NOT ENOUGH INFORMATION TO DETERMINE THE ANGLE OR THE
SCALAR PRODUCT
BONUS
2) Physics – Short Answer The root-mean-square voltage of AC power in the United States is 120 volts.
In volts and to two significant figures, what is its amplitude?
ANSWER: 170
High School - Round 13A Page 2
TOSS-UP
3) Math – Short Answer What is the sum of the largest prime number less than 50 and the smallest prime
number greater than 50?
ANSWER: 100
BONUS
3) Math – Multiple Choice A regular 15-sided polygon is inscribed in a circle with radius 6. Which of the
following is the length of one of its sides?
W) 6 sine 24°
X) 6 cosine 24°
Y) 12 sine 12°
Z) 12 cosine 12°
ANSWER: Y) 12 SINE 12°
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
TOSS-UP
4) Biology – Short Answer What cells in plants function similarly to embryonic [em-bree-ON-ic] stem
cells in animals?
ANSWER: MERISTEMATIC (ACCEPT: TOTIPOTENT)
BONUS
4) Biology – Short Answer The adenovirus [AD-an-oh-virus] capsid is shaped like what platonic solid?
ANSWER: ICOSAHEDRON (ACCEPT: REGULAR ICOSAHEDRON)
High School - Round 13A Page 3
TOSS-UP
5) Chemistry – Multiple Choice Nylon is a polymer formed by condensation reactions of diamines
[DYE-ah-meens] and dicarboxylic [dye-car-box-IHL-ik] acids. What functional group is formed by this
reaction?
W) Alcohol
X) Nitrile
Y) Ester
Z) Amide [AM-ide]
ANSWER: Z) AMIDE
BONUS
5) Chemistry – Short Answer Identify all of the following three organic compounds that can be used as
strong bases in a chemical reaction: 1) Pyridinium chloro-chromate; 2) Oxolane; 3) DMSO.
ANSWER: NONE
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
TOSS-UP
6) Earth and Space – Multiple Choice Which of the following methods of determining distances to
celestial objects is useful for the greatest distances?
W) Stellar parallax
X) Hubble’s law
Y) Variable stars
Z) Radar ranging
ANSWER: X) HUBBLE’S LAW
BONUS
6) Earth and Space – Short Answer As a planet with a circular orbit revolves around a star, how many of
its five Lagrangian [lah-GRAHN-jee-in] points will also move?
ANSWER: FIVE (ACCEPT: ALL OF THEM OR 5)
High School - Round 13A Page 4
TOSS-UP
7) Energy – Short Answer Researchers at Lawrence Berkeley National Lab are studying how mechanical
tension from proteins anchored at the nuclear membrane changes gene expression by imaging what
collection of external fibrous glycoproteins that provide structural and biochemical support to an animal
cell?
ANSWER: EXTRACELLULAR MATRIX (ACCEPT: ECM)
BONUS
7) Energy – Multiple Choice Scientists at Pacific Northwest National Lab tested theoretical predictions
of the rate of crystallization of metastable liquid water at temperatures well below 0 °C. Which of the
following is true of the crystallization of supercooled water in this regime?
W) Water gains enthalpy [EN-thul-pee] and entropy [EN-troh-pee], but loses Gibbs free energy
X) Water gains enthalpy, but loses entropy and Gibbs free energy
Y) Water gains entropy, but loses enthalpy and Gibbs free energy
Z) Water gains entropy, loses enthalpy, and its Gibbs free energy stays constant
ANSWER: Y) WATER GAINS ENTROPY, BUT LOSES ENTHALPY AND GIBBS FREE ENERGY
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
TOSS-UP
8) Math – Short Answer The graph of the function f of x lies in the third quadrant. The function g of x
equals –2 times f of x. In what quadrant does the graph of the function f of x + g of x lie?
ANSWER: SECOND (ACCEPT: 2)
BONUS
8) Math – Short Answer Two complex numbers have absolute values of √2 and 3√2, and angles of 57
degrees and 35 degrees, respectively. What are the absolute value and the angle degree measure of their
product?
ANSWER: ABSOLUTE VALUE = 6; ANGLE = 92
High School - Round 13A Page 5
TOSS-UP
9) Earth and Space – Multiple Choice Which of the following is NOT true of stellar evolution and the
HR diagram?
W) White dwarfs occupy the lower left region of the HR diagram
X) The sun falls on the main sequence
Y) The instability strip falls below the main sequence
Z) The Hayashi track is a pre-main-sequence phase of stellar evolution
ANSWER: Y) THE INSTABILITY STRIP FALLS BELOW THE MAIN SEQUENCE
BONUS
9) Earth and Space – Short Answer Identify all of the following three statements that are true of neutron
stars: 1) The paired neutron material can be considered a superfluid; 2) Neutron star crust contains
degenerate electrons; 3) Neutron stars are supported by degeneracy pressure.
ANSWER: ALL
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
TOSS-UP
10) Biology – Short Answer In what phylum [FYE-lum] is an octopus classified?
ANSWER: MOLLUSCA
BONUS
10) Biology – Multiple Choice In an indirect immunofluorescence experiment, which of the following
would be most useful for imaging a protein that is first probed with a rabbit antibody?
W) goat-anti-rabbit RFP
X) goat-anti-rabbit cAMP
Y) rabbit-anti-goat GFP
Z) goat-anti-mouse GFP
ANSWER: W) GOAT-ANTI-RABBIT RFP
High School - Round 13A Page 6
TOSS-UP
11) Physics – Short Answer Doug pushes a 7-kilogram box up a 30-degree ramp onto the bed of a truck,
which is 3 meters above the ground. In joules and rounded to the nearest 10, how much work did he do?
ANSWER: 210
BONUS
11) Physics – Short Answer According to Noether’s [Noh-turz] Theorem, the conservation of angular
momentum is related to what kind of spatial symmetry?
ANSWER: ROTATIONAL (ACCEPT: ROTATIONAL INVARIANCE)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
TOSS-UP
12) Chemistry – Multiple Choice A student observes the dimerization [dye-mur-ih-ZAY-shun] of a
solution of cyclopentadiene [sigh-kloh-penta-DYE-een]. Assuming the reaction is second-order in
cyclopentadiene, which of the following will she observe as she continues to monitor the reaction?
W) The rate increases
X) The rate remains constant
Y) The half-life increases
Z) The half-life remains constant
ANSWER: Y) THE HALF-LIFE INCREASES
BONUS
12) Chemistry – Multiple Choice Consider a gas-phase reaction where delta-H is less than delta-U. If the
reaction is at equilibrium, which of the following changes will ALWAYS shift the reaction mixture to the
right?
W) Increasing the temperature
X) Decreasing the temperature
Y) Increasing the volume
Z) Decreasing the volume
ANSWER: Z) DECREASING THE VOLUME
High School - Round 13A Page 7
TOSS-UP
13) Biology – Short Answer What property is exhibited by genes that have multiple phenotypic [FEEno-TIP-ik] effects?
ANSWER: PLEIOTROPY
BONUS
13) Biology – Multiple Choice White flowers with a long, narrow corolla tube that flower at night are
most likely pollinated by what animals?
W) Beetles
X) Birds
Y) Bats
Z) Moths
ANSWER: Z) MOTHS
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
TOSS-UP
14) Energy – Short Answer EXO-200 is a SLAC [slack]-supported experiment attempting to determine
if anti-neutrinos [new-TREE-noze] and neutrinos are the same particle. They are doing this by observing
the double beta [BAY-tah] decay of what noble gas?
ANSWER: XENON [ZEE-non]
BONUS
14) Energy – Short Answer Scientists at Oak Ridge National Lab are using computer simulations to
better understand the stability of calcium-52, which is inadequately described by current theories. Most
surprisingly, despite having completely filled a nucleon shell, calcium-52 does not appear to behave like
what set of nuclei?
ANSWER: MAGIC NUCLEI (ACCEPT: MAGIC NUMBER NUCLEI)
High School - Round 13A Page 8
TOSS-UP
15) Earth and Space – Multiple Choice Which of the following pairs of tectonic [tek-TAWN-ik] plates
does NOT constitute a primarily convergent boundary?
W) North American and Cocos plates
X) South American and Nazca plates
Y) African and Eurasian plates
Z) Pacific and Antarctic plates
ANSWER: Z) PACIFIC AND ANTARCTIC PLATES
BONUS
15) Earth and Space – Short Answer Identify all of the following three geologic principles that are
Steno’s [STEH-nose] Laws: 1) Law of original horizontality[haw-rih-zon-TAL-ih-tee]; 2) Law of
superposition; 3) Law of faunal succession.
ANSWER: 1 AND 2
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
TOSS-UP
16) Physics – Multiple Choice The statement that magnetic monopoles do not exist in classical physics is
most equivalent to which of the following statements?
W) The magnetic field has a divergence of zero
X) The electric field has a divergence related to total charge density
Y) A changing magnetic field will induce an electromotive force in a closed loop
Z) A moving charge will induce a magnetic field
ANSWER: W) THE MAGNETIC FIELD HAS A DIVERGENCE OF ZERO
BONUS
16) Physics – Short Answer Identify all of the following three particles that have a color charge of zero:
1) Free neutron; 2) Free proton; 3) Electron.
ANSWER: ALL (ACCEPT: 1 2 3 OR 1,2,3)
High School - Round 13A Page 9
TOSS-UP
17) Chemistry – Short Answer What is the IUPAC name for the compound with the chemical formula
Ni(CO)4?
ANSWER: TETRACARBONYL NICKEL ZERO (ACCEPT: TETRACARBONYL NICKEL)
BONUS
17) Chemistry – Short Answer Consider a zero-order reaction with a single aqueous [AY-kwee-us]
reactant A. If the initial concentration of A is 1 molar and the half-life at this time is 10 seconds, how many
seconds will elapse before the concentration of A is 0.25 molar?
ANSWER: 15
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
TOSS-UP
18) Math – Short Answer What is the integral from –3 to 6 of 4 dx?
ANSWER: 36
BONUS
18) Math – Short Answer If the probability of event A is 0.4, the probability of event B is 0.6, and the
probability of both A and B occurring is 0.3, what is the probability of event A given that B has already
occurred?
ANSWER: 0.5 (ACCEPT: ½, 50%)
High School - Round 13A Page 10
TOSS-UP
19) Biology – Short Answer What is the adjective for the specialized type of fruit in which the fruit
develops from several flowers, of which pineapples are an example?
ANSWER: MULTIPLE (ACCEPT: COLLECTIVE)
BONUS
19) Biology – Short Answer Identify all of the following three responses that are activities of the
parasympathetic division of the nervous system: 1) Bronchi [BRONK-eye] relaxation in lungs; 2) Heart-rate
acceleration; 3) Stimulation of the adrenal [Ah-DREE-nul] medulla [meh-DULL-ah].
ANSWER: NONE
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
TOSS-UP
20) Chemistry – Short Answer Positron-emission tomography is a medical technique that involves the
dosing of a patient with a fluorinated analog of what biochemically important molecule?
ANSWER: GLUCOSE
BONUS
20) Chemistry – Short Answer Rank the following three types of interactions in increasing order of
energy cost in a conformational analysis of the C2-C3 bond in butane: 1) H-H eclipsed overlap; 2) CH3-
CH3 eclipsed overlap; 3) H-CH3 eclipsed overlap.
ANSWER: 1, 3, 2 (ACCEPT: 1 3 2 OR 1, 3, and 2)
High School - Round 13A Page 11
TOSS-UP
21) Earth and Space – Short Answer What mineral can be found on the continuous branch of Bowen's
reaction series?
ANSWER: PLAGIOCLASE FELDSPAR (ACCEPT: PLAGIOCLASE; DO NOT ACCEPT: FELDSPAR)
BONUS
21) Earth and Space – Short Answer Identify all of the following three statements that are true regarding
winds: 1) In general, winds at the equator flow west; 2) Air rising from the equator sinks around 5 degrees
north and south latitudes; 3) At 30 degrees south latitude, the sinking air generally yields clear skies.
ANSWER: 1 AND 3
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
TOSS-UP
22) Math – Short Answer What is the discriminant of the quadratic function y = x2 – 5x + 9?
ANSWER: –11
BONUS
22) Math – Short Answer In a circle with radius 6, what is the area of a circular segment defined by an
arc of 60°?
ANSWER: 6π – 9√3
High School - Round 13A Page 12
TOSS-UP
23) Physics – Short Answer A propeller is accelerating at 2.5 radians per second squared. After 4
seconds, it has rotated through 80 radians. What was the initial angular velocity, in radians per second, at
the beginning of the 4 seconds?
ANSWER: 15
BONUS
23) Physics – Short Answer A beam of light is traveling inside a solid cube of a material with an index of
refraction of 1.414. If the cube is in air, what is the measure, to the nearest degree, of the minimum angle to
the normal inside the glass so that the beam of light will not enter the air?
ANSWER: 45`

]