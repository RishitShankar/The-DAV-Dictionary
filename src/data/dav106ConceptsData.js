// DAVDixence Master Academic Knowledge Vault
// Complete 110 Essential Curriculum Concepts across Mathematics, Science, Social Science, English, Hindi, Sanskrit & Computer Science
// Prepared for DAV Board & Olympiad Excellence (Classes LKG-8 & Foundation)

export const DAV_106_CONCEPTS = [
  {
    "id": 1,
    "title": "Rational Numbers & Field Properties",
    "classGrade": "Class 8",
    "subject": "Mathematics",
    "category": "Number Systems",
    "iconName": "Divide",
    "coreDefinition": "A rational number is any number expressible in the form p/q (p, q integers, q != 0). Rational numbers are closed, commutative, and associative under addition and multiplication.",
    "keyFormulaOrLaw": "p/q \\in \\mathbb{Q} \\quad (q \\neq 0); \\; a/b + 0 = a/b; \\; a/b \\times b/a = 1",
    "diagramDescription": "Number line showing dense distribution of fractions between integers with 0 as origin.",
    "realWorldExample": "Cooking recipes scaling fractions, financial interest rates, fuel capacity gauges.",
    "mnemonicOrMemoryHook": "C-C-A: Closure, Commutative, Associative.",
    "davExamTip": "Remember that division by zero is undefined, and subtraction is neither commutative nor associative.",
    "quickQuiz": {
      "question": "Which property does NOT hold for subtraction of rational numbers?",
      "options": [
        "Closure Property",
        "Commutative Property",
        "Existence of Negatives",
        "Representation on Number Line"
      ],
      "correctIndex": 1,
      "explanation": "Subtraction is not commutative: a/b - c/d != c/d - a/b in general."
    }
  },
  {
    "id": 2,
    "title": "Linear Equations in One Variable",
    "classGrade": "Class 8",
    "subject": "Mathematics",
    "category": "Algebra",
    "iconName": "Variable",
    "coreDefinition": "An algebraic equation where the degree of the single variable is exactly one. Solved by transposing terms across the equality sign.",
    "keyFormulaOrLaw": "ax + b = c \\implies x = \\frac{c - b}{a} \\quad (a \\neq 0)",
    "diagramDescription": "Balanced two-pan scale where equal additions or subtractions maintain horizontal equilibrium.",
    "realWorldExample": "Calculating train travel times, finding ages in age-relation word problems.",
    "mnemonicOrMemoryHook": "D-C-M-A-S: Distribute, Combine, Move variables, Add/subtract constants, Scale.",
    "davExamTip": "When cross-multiplying expressions like (x+1)/(2x+3) = 3/8, put binomials in brackets first.",
    "quickQuiz": {
      "question": "If 3x - 5 = 16, what is x?",
      "options": [
        "5",
        "7",
        "9",
        "11"
      ],
      "correctIndex": 1,
      "explanation": "3x = 16 + 5 = 21 => x = 21 / 3 = 7."
    }
  },
  {
    "id": 3,
    "title": "Angle Sum Property of Polygons",
    "classGrade": "Class 8",
    "subject": "Mathematics",
    "category": "Geometry",
    "iconName": "Polygon",
    "coreDefinition": "For any convex polygon with n sides, the sum of interior angles is (n - 2) * 180 deg, and exterior angles sum to 360 deg.",
    "keyFormulaOrLaw": "S_{\\text{int}} = (n - 2) \\times 180^\\circ; \\quad S_{\\text{ext}} = 360^\\circ; \\quad \\text{Each regular ext} = \\frac{360^\\circ}{n}",
    "diagramDescription": "Polygon partitioned into (n - 2) non-overlapping triangles radiating from a single vertex.",
    "realWorldExample": "Floor tiling tessellations using regular hexagons or octagons.",
    "mnemonicOrMemoryHook": "Subtract 2, Multiply 180!",
    "davExamTip": "If interior angle is 165 deg, exterior angle is 180 - 165 = 15 deg, n = 360 / 15 = 24 sides.",
    "quickQuiz": {
      "question": "What is the sum of interior angles of an octagon (8 sides)?",
      "options": [
        "900°",
        "1080°",
        "1260°",
        "1440°"
      ],
      "correctIndex": 1,
      "explanation": "Sum = (8 - 2) * 180 = 6 * 180 = 1080 deg."
    }
  },
  {
    "id": 4,
    "title": "Special Quadrilaterals & Parallelograms",
    "classGrade": "Class 8",
    "subject": "Mathematics",
    "category": "Geometry",
    "iconName": "Shapes",
    "coreDefinition": "Opposite sides and angles of a parallelogram are equal; diagonals bisect each other. A rhombus has perpendicular diagonals; a rectangle has equal diagonals; a square has both.",
    "keyFormulaOrLaw": "AB = CD, AD = BC; \\quad \\angle A = \\angle C; \\quad \\text{Rhombus: } d_1 \\perp d_2; \\quad \\text{Rect: } d_1 = d_2",
    "diagramDescription": "Venn hierarchy showing Trapezium > Parallelogram > {Rhombus, Rectangle} > Square.",
    "realWorldExample": "Scissor lifts and pantographs that maintain parallel motion when extended.",
    "mnemonicOrMemoryHook": "SQUARE unites both Rhombus and Rectangle properties!",
    "davExamTip": "Every square is a rhombus, but not every rhombus is a square because rhombus angles need not be 90 deg.",
    "quickQuiz": {
      "question": "In which quadrilateral are diagonals perpendicular AND equal in length?",
      "options": [
        "Parallelogram",
        "Rhombus",
        "Rectangle",
        "Square"
      ],
      "correctIndex": 3,
      "explanation": "Only a square has diagonals that are both equal and perpendicularly bisecting."
    }
  },
  {
    "id": 5,
    "title": "Squares, Square Roots & Division Method",
    "classGrade": "Class 8",
    "subject": "Mathematics",
    "category": "Arithmetic",
    "iconName": "Square",
    "coreDefinition": "A number is a perfect square if n = m^2. Roots can be found by prime factorisation or the long division grouping method.",
    "keyFormulaOrLaw": "\\sqrt{n} = m \\iff m^2 = n; \\quad 1 + 3 + 5 + \\dots + (2k-1) = k^2",
    "diagramDescription": "Square grid of k x k unit squares showing sum of first k odd numbers equals k^2.",
    "realWorldExample": "Land plot boundary measurement and screen aspect ratios.",
    "mnemonicOrMemoryHook": "Pair digits from the decimal point outward before long division.",
    "davExamTip": "Numbers ending in 2, 3, 7, or 8 can never be perfect squares.",
    "quickQuiz": {
      "question": "Which number cannot be a perfect square based on its unit digit?",
      "options": [
        "1024",
        "2025",
        "3087",
        "4096"
      ],
      "correctIndex": 2,
      "explanation": "3087 ends in 7; perfect squares never end in 2, 3, 7, or 8."
    }
  },
  {
    "id": 6,
    "title": "Pythagorean Triples & Geometric Significance",
    "classGrade": "Class 8",
    "subject": "Mathematics",
    "category": "Number Theory",
    "iconName": "Triangle",
    "coreDefinition": "Three positive integers (a, b, c) satisfying a^2 + b^2 = c^2. For any m > 1, (2m, m^2 - 1, m^2 + 1) forms a triplet.",
    "keyFormulaOrLaw": "a^2 + b^2 = c^2; \\quad \\{2m,\\; m^2 - 1,\\; m^2 + 1\\} \\quad (m > 1)",
    "diagramDescription": "Right triangle with squares drawn on all three sides proving area sum.",
    "realWorldExample": "Carpentry 3-4-5 rule for creating perfect right-angled corners.",
    "mnemonicOrMemoryHook": "2m is the key: set the given even number to 2m, solve for m.",
    "davExamTip": "If smallest member is 14, 2m = 14 => m = 7, giving (14, 48, 50).",
    "quickQuiz": {
      "question": "If 2m = 6, what are the other two members of the Pythagorean triplet?",
      "options": [
        "7 and 9",
        "8 and 10",
        "9 and 12",
        "10 and 14"
      ],
      "correctIndex": 1,
      "explanation": "m = 3 => m^2 - 1 = 8, m^2 + 1 = 10. Triplet is (6, 8, 10)."
    }
  },
  {
    "id": 7,
    "title": "Cubes & Hardy-Ramanujan Numbers",
    "classGrade": "Class 8",
    "subject": "Mathematics",
    "category": "Arithmetic",
    "iconName": "Box",
    "coreDefinition": "The cube of a number is n^3 = n * n * n. 1729 is the smallest number expressible as the sum of two cubes in two different ways.",
    "keyFormulaOrLaw": "\\sqrt[3]{n} = k \\iff k^3 = n; \\quad 1729 = 1^3 + 12^3 = 9^3 + 10^3",
    "diagramDescription": "3D block isometric cube illustrating volumetric progression.",
    "realWorldExample": "Water tank storage capacity and shipping container sizing.",
    "mnemonicOrMemoryHook": "1729: Ramanujan Taxi-Cab number = 1^3 + 12^3 = 9^3 + 10^3.",
    "davExamTip": "Cube root of a negative number is negative: ∛(-x) = -∛x.",
    "quickQuiz": {
      "question": "What is the cube root of -3375?",
      "options": [
        "-15",
        "-25",
        "-35",
        "-5"
      ],
      "correctIndex": 0,
      "explanation": "(-15)^3 = -3375, so the cube root is -15."
    }
  },
  {
    "id": 8,
    "title": "Commercial Math: Profit, Loss & Discount",
    "classGrade": "Class 8",
    "subject": "Mathematics",
    "category": "Commercial",
    "iconName": "Percent",
    "coreDefinition": "Profit or Loss % is always computed on Cost Price (CP). Discount % is always computed on Marked Price (MP).",
    "keyFormulaOrLaw": "\\text{Profit}\\% = \\frac{SP - CP}{CP} \\times 100; \\quad \\text{Discount}\\% = \\frac{MP - SP}{MP} \\times 100",
    "diagramDescription": "Price chain: Cost Price + Markup = Marked Price - Discount = Selling Price.",
    "realWorldExample": "Festival retail sales, e-commerce discounts, and GST invoice taxation.",
    "mnemonicOrMemoryHook": "CP is base for Profit, MP is base for Discount!",
    "davExamTip": "GST is calculated on the discounted Selling Price, not Marked Price.",
    "quickQuiz": {
      "question": "An item marked ₹500 is sold for ₹425. What is the discount percentage?",
      "options": [
        "10%",
        "15%",
        "20%",
        "25%"
      ],
      "correctIndex": 1,
      "explanation": "Discount = ₹75. Discount % = (75 / 500) * 100 = 15%."
    }
  },
  {
    "id": 9,
    "title": "Compound Interest & Compounding Periods",
    "classGrade": "Class 8",
    "subject": "Mathematics",
    "category": "Commercial",
    "iconName": "TrendingUp",
    "coreDefinition": "Interest calculated on initial principal plus accumulated interest. For semi-annual compounding: R -> R/2 and n -> 2n.",
    "keyFormulaOrLaw": "A = P\\left(1 + \\frac{R}{100}\\right)^n; \\quad A_{\\text{semi}} = P\\left(1 + \\frac{R}{200}\\right)^{2n}; \\quad CI = A - P",
    "diagramDescription": "Exponential compound curve diverging upward from linear simple interest line.",
    "realWorldExample": "Bank fixed deposits, mutual fund compounding, and inflation modeling.",
    "mnemonicOrMemoryHook": "Semi-annual: Half the rate, double the time!",
    "davExamTip": "For the first year at annual compounding, SI and CI are strictly identical.",
    "quickQuiz": {
      "question": "What is the amount on ₹8000 for 1 year at 10% per annum compounded semi-annually?",
      "options": [
        "₹8800",
        "₹8820",
        "₹8900",
        "₹9000"
      ],
      "correctIndex": 1,
      "explanation": "R/2 = 5%, 2n = 2. A = 8000 * (1.05)^2 = 8000 * 1.1025 = ₹8820."
    }
  },
  {
    "id": 10,
    "title": "Direct and Inverse Proportions",
    "classGrade": "Class 8",
    "subject": "Mathematics",
    "category": "Proportions",
    "iconName": "ArrowLeftRight",
    "coreDefinition": "Direct: ratio x/y is constant. Inverse: product x * y is constant.",
    "keyFormulaOrLaw": "\\text{Direct: } \\frac{x_1}{y_1} = \\frac{x_2}{y_2}; \\quad \\text{Inverse: } x_1 y_1 = x_2 y_2 = k",
    "diagramDescription": "Direct line passes through origin; inverse curve is a rectangular hyperbola.",
    "realWorldExample": "Direct: Petrol consumed vs distance. Inverse: Workers vs time needed.",
    "mnemonicOrMemoryHook": "Direct Divides (x/y = k), Inverse Multiplies (xy = k)!",
    "davExamTip": "Verify whether increasing one variable decreases the other before solving.",
    "quickQuiz": {
      "question": "If 12 men complete a work in 20 days, how many days will 15 men take?",
      "options": [
        "14 days",
        "16 days",
        "18 days",
        "24 days"
      ],
      "correctIndex": 1,
      "explanation": "Inverse: 12 * 20 = 15 * d => d = 240 / 15 = 16 days."
    }
  },
  {
    "id": 11,
    "title": "Algebraic Expressions & Polynomial Degrees",
    "classGrade": "Class 8",
    "subject": "Mathematics",
    "category": "Algebra",
    "iconName": "Sigma",
    "coreDefinition": "Expressions combine constants and variables via arithmetic operations. Monomial (1), Binomial (2), Trinomial (3). Degree is highest exponent.",
    "keyFormulaOrLaw": "P(x) = a_n x^n + \\dots + a_0; \\quad \\text{Degree} = \\max(\\sum \\text{exponents})",
    "diagramDescription": "Tree branching from polynomial down into individual terms, coefficients, and variables.",
    "realWorldExample": "Physics trajectory equations and financial revenue forecasting models.",
    "mnemonicOrMemoryHook": "Like terms have identical variable letters AND exponents.",
    "davExamTip": "Only like terms can be added or subtracted together.",
    "quickQuiz": {
      "question": "What is the degree of 5x^2y^3 - 3xy^5 + 7?",
      "options": [
        "5",
        "6",
        "7",
        "8"
      ],
      "correctIndex": 1,
      "explanation": "For -3xy^5, the degree is 1 + 5 = 6, which is the highest power sum."
    }
  },
  {
    "id": 12,
    "title": "Standard Algebraic Identities",
    "classGrade": "Class 8",
    "subject": "Mathematics",
    "category": "Algebra",
    "iconName": "Equal",
    "coreDefinition": "Identities hold true for all values of the variables. Core: (a+b)^2, (a-b)^2, (a+b)(a-b) = a^2 - b^2.",
    "keyFormulaOrLaw": "(a \\pm b)^2 = a^2 \\pm 2ab + b^2; \\quad (a+b)(a-b) = a^2 - b^2; \\quad (x+a)(x+b) = x^2 + (a+b)x + ab",
    "diagramDescription": "Square of side (a+b) partitioned into areas a^2, 2ab, and b^2.",
    "realWorldExample": "Mental math: 103^2 = (100+3)^2 = 10000 + 600 + 9 = 10,609.",
    "mnemonicOrMemoryHook": "First squared, double product, last squared!",
    "davExamTip": "To evaluate 98 * 102: write as (100 - 2)(100 + 2) = 100^2 - 2^2 = 9996.",
    "quickQuiz": {
      "question": "Evaluate 104 * 96 using algebraic identities.",
      "options": [
        "9984",
        "9976",
        "9992",
        "9964"
      ],
      "correctIndex": 0,
      "explanation": "(100 + 4)(100 - 4) = 100^2 - 4^2 = 10000 - 16 = 9984."
    }
  },
  {
    "id": 13,
    "title": "Factorisation & Splitting Middle Term",
    "classGrade": "Class 8",
    "subject": "Mathematics",
    "category": "Algebra",
    "iconName": "Sliders",
    "coreDefinition": "Expressing polynomials as products of irreducible factors via GCF extraction, grouping, identities, or splitting middle terms.",
    "keyFormulaOrLaw": "x^2 + (a+b)x + ab = (x+a)(x+b); \\quad a^2 - b^2 = (a-b)(a+b)",
    "diagramDescription": "Rectangle with area partitioned into tiles showing side factors (x+a) and (x+b).",
    "realWorldExample": "RSA cryptography prime factorisation securing bank transactions.",
    "mnemonicOrMemoryHook": "Find two numbers with Product = c and Sum = b to split bx in x^2 + bx + c.",
    "davExamTip": "Always extract the Greatest Common Factor from all terms first.",
    "quickQuiz": {
      "question": "Factorise x^2 + 9x + 20.",
      "options": [
        "(x+1)(x+20)",
        "(x+2)(x+10)",
        "(x+4)(x+5)",
        "(x-4)(x-5)"
      ],
      "correctIndex": 2,
      "explanation": "4 * 5 = 20 and 4 + 5 = 9. Thus (x+4)(x+5)."
    }
  },
  {
    "id": 14,
    "title": "Euler's Formula for Polyhedra",
    "classGrade": "Class 8",
    "subject": "Mathematics",
    "category": "Geometry",
    "iconName": "Cube",
    "coreDefinition": "For any convex polyhedron, Faces (F), Vertices (V), and Edges (E) satisfy F + V - E = 2.",
    "keyFormulaOrLaw": "F + V - E = 2 \\iff F + V = E + 2",
    "diagramDescription": "Cube: F = 6, V = 8, E = 12 => 6 + 8 - 12 = 2.",
    "realWorldExample": "Fullerene C60 carbon buckyball geometry and 3D computer graphics meshes.",
    "mnemonicOrMemoryHook": "F-V-E is Free: Faces + Vertices beats Edges by 2!",
    "davExamTip": "If F = 20 and V = 12, E = 20 + 12 - 2 = 30 edges.",
    "quickQuiz": {
      "question": "A polyhedron has 8 faces and 12 vertices. How many edges does it have?",
      "options": [
        "16",
        "18",
        "20",
        "22"
      ],
      "correctIndex": 1,
      "explanation": "F + V - E = 2 => 8 + 12 - E = 2 => E = 18."
    }
  },
  {
    "id": 15,
    "title": "Surface Area of Cuboid, Cube & Cylinder",
    "classGrade": "Class 8",
    "subject": "Mathematics",
    "category": "Mensuration",
    "iconName": "Layers",
    "coreDefinition": "Total Surface Area includes all boundary faces. Curved/Lateral excludes top and bottom bases.",
    "keyFormulaOrLaw": "\\text{TSA}_{\\text{cuboid}} = 2(lb+bh+hl); \\; \\text{TSA}_{\\text{cube}} = 6a^2; \\; \\text{CSA}_{\\text{cyl}} = 2\\pi rh; \\; \\text{TSA}_{\\text{cyl}} = 2\\pi r(r+h)",
    "diagramDescription": "Unfolded net of a cylinder into a 2pi*r by h rectangle with two circular lids.",
    "realWorldExample": "Painting room walls (lateral area), manufacturing tin cans.",
    "mnemonicOrMemoryHook": "Unroll the cylinder: the curved side is a rectangle of length 2pi*r!",
    "davExamTip": "Painting 4 walls: Area = 2h(l + b). Add l*b only if ceiling is included.",
    "quickQuiz": {
      "question": "What is the curved surface area of a cylinder with r = 7 cm, h = 5 cm (pi = 22/7)?",
      "options": [
        "110 cm²",
        "220 cm²",
        "330 cm²",
        "440 cm²"
      ],
      "correctIndex": 1,
      "explanation": "CSA = 2 * (22/7) * 7 * 5 = 220 cm²."
    }
  },
  {
    "id": 16,
    "title": "Volume and Liquid Capacity",
    "classGrade": "Class 8",
    "subject": "Mathematics",
    "category": "Mensuration",
    "iconName": "Cylinder",
    "coreDefinition": "Volume is 3D space enclosed. Capacity is liquid volume held. 1 m^3 = 1000 Litres; 1000 cm^3 = 1 Litre.",
    "keyFormulaOrLaw": "V_{\\text{cuboid}} = l \\cdot b \\cdot h; \\quad V_{\\text{cyl}} = \\pi r^2 h; \\quad 1\\text{ m}^3 = 1000\\text{ L}",
    "diagramDescription": "1 m x 1 m x 1 m cube packed with 1,000 one-liter bottles.",
    "realWorldExample": "Designing overhead water tanks, medicine syrup bottles, reservoir capacities.",
    "mnemonicOrMemoryHook": "Volume = Base Area x Height for uniform prisms and cylinders.",
    "davExamTip": "Always convert all dimensions into identical units before multiplying.",
    "quickQuiz": {
      "question": "How many litres does a cubical tank of edge 2 meters hold?",
      "options": [
        "2000 L",
        "4000 L",
        "8000 L",
        "16000 L"
      ],
      "correctIndex": 2,
      "explanation": "V = 2^3 = 8 m^3. Since 1 m^3 = 1000 L, capacity = 8000 L."
    }
  },
  {
    "id": 17,
    "title": "Laws of Exponents & Indices",
    "classGrade": "Class 8",
    "subject": "Mathematics",
    "category": "Number Systems",
    "iconName": "Zap",
    "coreDefinition": "Rules for powers: multiplying like bases adds powers, dividing subtracts, negative powers flip to denominator, a^0 = 1.",
    "keyFormulaOrLaw": "a^m \\cdot a^n = a^{m+n}; \\; \\frac{a^m}{a^n} = a^{m-n}; \\; (a^m)^n = a^{mn}; \\; a^{-m} = \\frac{1}{a^m}; \\; a^0 = 1",
    "diagramDescription": "Power ladder stepping down by division, showing a^0 = 1 and a^-1 = 1/a.",
    "realWorldExample": "Computer clock frequencies (GHz), earthquake Richter scale magnitudes.",
    "mnemonicOrMemoryHook": "Multiply Adds, Divide Subtracts, Power Powers Multiplies!",
    "davExamTip": "Any non-zero expression raised to power 0 equals 1.",
    "quickQuiz": {
      "question": "Simplify: (2^3 * 2^2) / 2^4",
      "options": [
        "1",
        "2",
        "4",
        "8"
      ],
      "correctIndex": 1,
      "explanation": "2^(3+2) / 2^4 = 2^5 / 2^4 = 2^(5-4) = 2^1 = 2."
    }
  },
  {
    "id": 18,
    "title": "Scientific Notation / Standard Form",
    "classGrade": "Class 8",
    "subject": "Mathematics",
    "category": "Number Systems",
    "iconName": "Hash",
    "coreDefinition": "Writing very large or tiny numbers as m * 10^n where 1 <= m < 10 and n is an integer.",
    "keyFormulaOrLaw": "N = m \\times 10^n \\quad (1 \\le m < 10)",
    "diagramDescription": "Scale bar from electron radius (10^-15 m) to observable universe (10^26 m).",
    "realWorldExample": "Speed of light = 3.0 * 10^8 m/s; red blood cell diameter = 7.0 * 10^-6 m.",
    "mnemonicOrMemoryHook": "Move decimal left -> power is positive; move right -> power is negative.",
    "davExamTip": "m must be strictly between 1 and 10. 45 * 10^4 is not standard form.",
    "quickQuiz": {
      "question": "Express 0.000045 in scientific notation.",
      "options": [
        "45 * 10^-6",
        "4.5 * 10^-5",
        "4.5 * 10^-6",
        "0.45 * 10^-4"
      ],
      "correctIndex": 1,
      "explanation": "Move decimal 5 places right: 4.5 * 10^-5."
    }
  },
  {
    "id": 19,
    "title": "Cartesian Coordinates & Line Graphs",
    "classGrade": "Class 8",
    "subject": "Mathematics",
    "category": "Coordinate Geometry",
    "iconName": "Compass",
    "coreDefinition": "2D plane with horizontal X-axis and vertical Y-axis intersecting at (0,0). Points written as ordered pairs (x, y).",
    "keyFormulaOrLaw": "P(x, y); \\quad \\text{Origin} = (0,0); \\quad \\text{X-axis: } y = 0; \\quad \\text{Y-axis: } x = 0",
    "diagramDescription": "Four quadrants showing signs: I (+,+), II (-,+), III (-,-), IV (+,-).",
    "realWorldExample": "GPS satellite coordinates, air traffic control flight radar.",
    "mnemonicOrMemoryHook": "Crawl along X, then climb along Y!",
    "davExamTip": "Points on the X-axis have y = 0; points on Y-axis have x = 0.",
    "quickQuiz": {
      "question": "In which quadrant does the point (-3, -7) lie?",
      "options": [
        "Quadrant I",
        "Quadrant II",
        "Quadrant III",
        "Quadrant IV"
      ],
      "correctIndex": 2,
      "explanation": "Both x and y are negative in Quadrant III."
    }
  },
  {
    "id": 20,
    "title": "Divisibility Rules & Number Puzzles",
    "classGrade": "Class 8",
    "subject": "Mathematics",
    "category": "Number Theory",
    "iconName": "CheckSquare",
    "coreDefinition": "Testing divisibility without full division. 3/9: digit sum. 4: last 2 digits. 11: alternating digit sum difference.",
    "keyFormulaOrLaw": "\\text{Div by 11: } |S_{\\text{odd}} - S_{\\text{even}}| = 0 \\text{ or multiple of } 11",
    "diagramDescription": "Decision flowchart testing an input number for divisibility.",
    "realWorldExample": "Bank card Luhn algorithm checksums and ISBN validation.",
    "mnemonicOrMemoryHook": "Sum for 3 & 9, alternating difference for 11!",
    "davExamTip": "If 21y5 is divisible by 9, sum = 8 + y => y must be 1.",
    "quickQuiz": {
      "question": "Which number is divisible by 9?",
      "options": [
        "2345",
        "3456",
        "4567",
        "5678"
      ],
      "correctIndex": 1,
      "explanation": "Sum of digits in 3456 is 3 + 4 + 5 + 6 = 18, which is divisible by 9."
    }
  },
  {
    "id": 21,
    "title": "Theoretical Probability & Sample Spaces",
    "classGrade": "Class 8",
    "subject": "Mathematics",
    "category": "Probability",
    "iconName": "HelpCircle",
    "coreDefinition": "Measure of chance: ratio of favorable outcomes to total equally likely outcomes. Probability is always between 0 and 1.",
    "keyFormulaOrLaw": "P(E) = \\frac{n(E)}{n(S)}; \\quad 0 \\le P(E) \\le 1; \\quad P(E) + P(\\bar{E}) = 1",
    "diagramDescription": "Sample space Venn diagram with event boundary containing target outcomes.",
    "realWorldExample": "Weather rain probabilities, genetic inheritance models.",
    "mnemonicOrMemoryHook": "Favorable on top, Total on bottom!",
    "davExamTip": "P can never be negative or greater than 1. Impossible event = 0, sure event = 1.",
    "quickQuiz": {
      "question": "What is the probability of drawing an Ace from a well-shuffled pack of 52 cards?",
      "options": [
        "1/13",
        "1/26",
        "1/52",
        "4/13"
      ],
      "correctIndex": 0,
      "explanation": "There are 4 Aces in 52 cards: P = 4/52 = 1/13."
    }
  },
  {
    "id": 22,
    "title": "Histograms & Pie Chart Central Angles",
    "classGrade": "Class 8",
    "subject": "Mathematics",
    "category": "Statistics",
    "iconName": "PieChart",
    "coreDefinition": "Histograms display continuous grouped data without gaps. Pie charts represent parts of a whole with sectors summing to 360 deg.",
    "keyFormulaOrLaw": "\\text{Central Angle } \\theta = \\left(\\frac{\\text{Value}}{\\text{Total}}\\right) \\times 360^\\circ",
    "diagramDescription": "Pie circle with colored sectors labeled with degrees summing to 360.",
    "realWorldExample": "National budget visualisations, school exam grade breakdowns.",
    "mnemonicOrMemoryHook": "Fraction of Whole * 360 degrees = Sector Angle!",
    "davExamTip": "Histograms have no gaps between bars because class intervals are continuous.",
    "quickQuiz": {
      "question": "What central angle represents 25% in a pie chart?",
      "options": [
        "45°",
        "60°",
        "90°",
        "120°"
      ],
      "correctIndex": 2,
      "explanation": "25% of 360° = 0.25 * 360° = 90°."
    }
  },
  {
    "id": 23,
    "title": "Triangle Congruence Criteria",
    "classGrade": "Class 7/8",
    "subject": "Mathematics",
    "category": "Geometry",
    "iconName": "CheckCheck",
    "coreDefinition": "Two triangles are congruent if identical in shape and size: SSS, SAS, ASA, RHS. AAA is NOT a congruence condition.",
    "keyFormulaOrLaw": "\\triangle ABC \\cong \\triangle DEF \\implies \\text{CPCT (Corresponding Parts)}",
    "diagramDescription": "Pair of congruent triangles with tick marks on equal sides and arcs on equal angles.",
    "realWorldExample": "Standardised manufacturing of identical replacement machine parts.",
    "mnemonicOrMemoryHook": "CPCT: Corresponding Parts of Congruent Triangles are Equal!",
    "davExamTip": "In SAS, the angle MUST be included between the two equal sides.",
    "quickQuiz": {
      "question": "Why is AAA not a congruence criterion?",
      "options": [
        "Triangles must have right angles",
        "It only proves identical shape, not equal size",
        "Angles cannot be measured",
        "It is only for squares"
      ],
      "correctIndex": 1,
      "explanation": "AAA proves triangles are similar (same shape), but one can be magnified."
    }
  },
  {
    "id": 24,
    "title": "Circle Geometry: Chords, Tangents & Arcs",
    "classGrade": "Class 8",
    "subject": "Mathematics",
    "category": "Geometry",
    "iconName": "Circle",
    "coreDefinition": "Perimeter is circumference 2pi*r. Area is pi*r^2. The perpendicular from center to a chord bisects the chord.",
    "keyFormulaOrLaw": "C = 2\\pi r; \\quad A = \\pi r^2; \\quad OM \\perp AB \\implies AM = MB",
    "diagramDescription": "Circle showing radius r, chord AB, and perpendicular bisector OM from origin.",
    "realWorldExample": "Bicycle wheel spokes, roundabouts, orbital satellite paths.",
    "mnemonicOrMemoryHook": "2pi*r for the rim, pi*r^2 for the trim!",
    "davExamTip": "Semi-circle perimeter includes the diameter base: P = pi*r + 2r.",
    "quickQuiz": {
      "question": "What is the circumference of a circle of radius 14 cm (pi = 22/7)?",
      "options": [
        "44 cm",
        "88 cm",
        "132 cm",
        "616 cm"
      ],
      "correctIndex": 1,
      "explanation": "C = 2 * (22/7) * 14 = 88 cm."
    }
  },
  {
    "id": 25,
    "title": "Force: Magnitude, Direction & Vector Nature",
    "classGrade": "Class 8",
    "subject": "Physics",
    "category": "Mechanics",
    "iconName": "ArrowRight",
    "coreDefinition": "A force is a push or pull on an object resulting from interaction with another object. It has magnitude and direction (vector) and causes acceleration or deformation.",
    "keyFormulaOrLaw": "F = ma; \\quad [F] = \\text{Newton (N)} = \\text{kg}\\cdot\\text{m}/\\text{s}^2",
    "diagramDescription": "Free-body diagram showing force arrows with magnitude lengths acting on a block.",
    "realWorldExample": "Kicking a football, tug-of-war net force equilibrium, rocket thrust.",
    "mnemonicOrMemoryHook": "Force changes Speed, Direction, or Shape!",
    "davExamTip": "Forces in the same direction add (F1 + F2); opposite forces subtract (|F1 - F2|).",
    "quickQuiz": {
      "question": "Two forces of 10 N and 6 N act in opposite directions on an object. What is the net force?",
      "options": [
        "16 N",
        "4 N in direction of 10 N",
        "4 N in direction of 6 N",
        "60 N"
      ],
      "correctIndex": 1,
      "explanation": "Opposite forces subtract: 10 N - 6 N = 4 N in the direction of the larger force."
    }
  },
  {
    "id": 26,
    "title": "Pressure & Depth in Liquids",
    "classGrade": "Class 8",
    "subject": "Physics",
    "category": "Mechanics",
    "iconName": "ArrowDown",
    "coreDefinition": "Pressure is force exerted perpendicularly per unit area. Liquid pressure increases with depth and acts equally in all directions at a given depth.",
    "keyFormulaOrLaw": "P = \\frac{F}{A}; \\quad P_{\\text{liquid}} = \\rho g h; \\quad 1\\text{ Pa} = 1\\text{ N/m}^2",
    "diagramDescription": "Dam cross-section thicker at the base to withstand higher liquid pressure at greater depth.",
    "realWorldExample": "Sharp knives cutting easily (smaller area = higher pressure), wide snowshoes preventing sinking.",
    "mnemonicOrMemoryHook": "Smaller Area -> Greater Pressure! (Sharp pins penetrate easily).",
    "davExamTip": "Why dam walls are built thicker at the bottom: liquid pressure increases with depth.",
    "quickQuiz": {
      "question": "Why do camels walk easily on desert sand compared to horses?",
      "options": [
        "Camels are lighter",
        "Broad feet exert less pressure on sand",
        "Desert sand is cold",
        "Camels exert more force"
      ],
      "correctIndex": 1,
      "explanation": "Broad feet provide larger contact area, reducing pressure (P = F/A) so feet don't sink."
    }
  },
  {
    "id": 27,
    "title": "Atmospheric Pressure & Barometers",
    "classGrade": "Class 8",
    "subject": "Physics",
    "category": "Fluids",
    "iconName": "CloudSun",
    "coreDefinition": "The weight of the column of air above unit area on Earth's surface. Standard atmospheric pressure at sea level is approx 101.3 kPa (76 cm of mercury).",
    "keyFormulaOrLaw": "P_{\\text{atm}} = 760\\text{ mm of Hg} = 1.013 \\times 10^5\\text{ Pa} = 1\\text{ bar}",
    "diagramDescription": "Torricelli mercury barometer column balanced by atmospheric pressure pushing on mercury trough.",
    "realWorldExample": "Drinking through a straw, rubber suction cups sticking to smooth glass walls.",
    "mnemonicOrMemoryHook": "Suction is not a pull — atmosphere pushes liquid up into the straw!",
    "davExamTip": "Atmospheric pressure decreases as altitude increases (why nosebleeds happen at high mountains).",
    "quickQuiz": {
      "question": "What pushes liquid up a straw when you drink through it?",
      "options": [
        "Suction force of mouth",
        "Atmospheric pressure on surface",
        "Gravity pulling liquid",
        "Capillary rise"
      ],
      "correctIndex": 1,
      "explanation": "Sucking creates low pressure inside straw; outside atmospheric pressure pushes liquid up."
    }
  },
  {
    "id": 28,
    "title": "Friction: Static, Sliding & Rolling",
    "classGrade": "Class 8",
    "subject": "Physics",
    "category": "Mechanics",
    "iconName": "ShieldAlert",
    "coreDefinition": "Friction opposes relative motion between two surfaces in contact due to microscopic interlocking. Static > Sliding > Rolling friction.",
    "keyFormulaOrLaw": "f_s \\le \\mu_s N; \\quad f_{\\text{static}} > f_{\\text{sliding}} > f_{\\text{rolling}}",
    "diagramDescription": "Microscopic roughness peaks and valleys interlocking between two polished blocks.",
    "realWorldExample": "Ball bearings in bicycle hubs replacing sliding with rolling friction; car tires gripping roads.",
    "mnemonicOrMemoryHook": "Rolling is easiest, Static is toughest to break!",
    "davExamTip": "Friction is a 'necessary evil': enables walking and writing, but causes machinery wear and heat.",
    "quickQuiz": {
      "question": "Which friction has the highest magnitude between two given surfaces?",
      "options": [
        "Rolling friction",
        "Sliding friction",
        "Static friction",
        "Fluid friction"
      ],
      "correctIndex": 2,
      "explanation": "Static friction is highest because microscopic irregularities interlock deeply at rest."
    }
  },
  {
    "id": 29,
    "title": "Sound: Vibration, Frequency, Pitch & Amplitude",
    "classGrade": "Class 8",
    "subject": "Physics",
    "category": "Acoustics",
    "iconName": "Volume2",
    "coreDefinition": "Sound is produced by vibrating bodies and propagates as mechanical longitudinal waves requiring a medium. Amplitude determines loudness; frequency determines pitch (shrilness).",
    "keyFormulaOrLaw": "v = f \\lambda; \\quad \\text{Loudness} \\propto \\text{Amplitude}^2; \\quad [f] = \\text{Hertz (Hz)}",
    "diagramDescription": "Sine waveform showing peak amplitude (height) and wavelength/frequency (cycles per second).",
    "realWorldExample": "Guitar strings vibrating, vocal cords producing high pitch (women/children) vs low pitch (men).",
    "mnemonicOrMemoryHook": "Amplitude = Loudness, Frequency = Pitch!",
    "davExamTip": "Sound CANNOT travel through a vacuum (proven by bell-jar experiment).",
    "quickQuiz": {
      "question": "If the amplitude of a sound wave is tripled, its loudness becomes:",
      "options": [
        "3 times",
        "6 times",
        "9 times",
        "1/3 times"
      ],
      "correctIndex": 2,
      "explanation": "Loudness is proportional to the square of amplitude: 3^2 = 9 times."
    }
  },
  {
    "id": 30,
    "title": "Human Hearing Range & Ultrasound",
    "classGrade": "Class 8",
    "subject": "Physics",
    "category": "Acoustics",
    "iconName": "Radio",
    "coreDefinition": "Human audible range is 20 Hz to 20,000 Hz. Below 20 Hz is Infrasonic (elephants, earthquakes); above 20 kHz is Ultrasonic (bats, sonar, medical imaging).",
    "keyFormulaOrLaw": "20\\text{ Hz} \\le f_{\\text{audible}} \\le 20,000\\text{ Hz}; \\quad \\text{Infrasound} < 20\\text{ Hz}; \\quad \\text{Ultrasound} > 20\\text{ kHz}",
    "diagramDescription": "Frequency spectrum band highlighting human hearing between infrasonic and ultrasonic zones.",
    "realWorldExample": "Bats navigating in darkness using echolocation, submarine SONAR depth sounders, medical sonography.",
    "mnemonicOrMemoryHook": "20 to 20K: Below is Infra, Above is Ultra!",
    "davExamTip": "Ultrasonic waves have very high frequencies and can penetrate deep tissues without radiation harm.",
    "quickQuiz": {
      "question": "What is the frequency of ultrasonic sound waves?",
      "options": [
        "Below 20 Hz",
        "Between 20 Hz and 20 kHz",
        "Above 20,000 Hz",
        "Exactly 0 Hz"
      ],
      "correctIndex": 2,
      "explanation": "Ultrasound has frequencies strictly greater than the upper limit of human hearing (20,000 Hz)."
    }
  },
  {
    "id": 31,
    "title": "Chemical Effects of Electric Current & Electroplating",
    "classGrade": "Class 8",
    "subject": "Physics",
    "category": "Electricity",
    "iconName": "BatteryCharging",
    "coreDefinition": "Passage of electric current through a conducting solution causes chemical reactions (electrolysis). Electroplating deposits a desired metal layer on another using DC current.",
    "keyFormulaOrLaw": "\\text{Anode: } M \\rightarrow M^{n+} + n e^-; \\quad \\text{Cathode: } M^{n+} + n e^- \\rightarrow M",
    "diagramDescription": "Electrolytic cell with copper sulfate solution, copper plate anode, and iron key cathode.",
    "realWorldExample": "Chromium plating on car bumpers for shine and corrosion resistance; gold plating on jewellery.",
    "mnemonicOrMemoryHook": "Cathode collects the coating metal (connected to negative terminal)!",
    "davExamTip": "The object to be plated is always connected to the negative terminal (cathode).",
    "quickQuiz": {
      "question": "During electroplating of copper on an iron nail, the iron nail must be connected to:",
      "options": [
        "Positive terminal (Anode)",
        "Negative terminal (Cathode)",
        "Either terminal",
        "AC mains"
      ],
      "correctIndex": 1,
      "explanation": "The article to be electroplated is made the cathode (negative terminal) so positive metal ions deposit on it."
    }
  },
  {
    "id": 32,
    "title": "Static Electricity & Lightning Conductors",
    "classGrade": "Class 8",
    "subject": "Physics",
    "category": "Electrostatics",
    "iconName": "Zap",
    "coreDefinition": "Static charge is generated by friction via electron transfer. Lightning is massive electrical discharge between clouds or cloud and ground. Lightning rods safely route charge into Earth.",
    "keyFormulaOrLaw": "Q = ne; \\quad \\text{Like charges repel, unlike charges attract}",
    "diagramDescription": "Gold-leaf electroscope diverging leaves, and building lightning conductor grounding spike into earth.",
    "realWorldExample": "Rubbing plastic comb with hair attracting paper bits, lightning arresters protecting skyscrapers.",
    "mnemonicOrMemoryHook": "Benjamin Franklin: Rub glass with silk -> positive charge; rub ebonite with fur -> negative charge.",
    "davExamTip": "Lightning conductor spikes provide a low-resistance path to the ground without damaging buildings.",
    "quickQuiz": {
      "question": "What instrument is used to detect the presence and nature of electric charge on a body?",
      "options": [
        "Ammeter",
        "Electroscope",
        "Barometer",
        "Voltmeter"
      ],
      "correctIndex": 1,
      "explanation": "A gold-leaf electroscope detects electric charge through the divergence of its leaves."
    }
  },
  {
    "id": 33,
    "title": "Earthquakes & Richter Scale",
    "classGrade": "Class 8",
    "subject": "Physics",
    "category": "Geophysics",
    "iconName": "Activity",
    "coreDefinition": "Sudden shaking of Earth's crust caused by movement along tectonic plate boundaries (fault zones). The magnitude is measured logarithmically on the Richter scale via seismographs.",
    "keyFormulaOrLaw": "\\text{Logarithmic Scale: Each unit increase on Richter represents } \\approx 31.6\\times \\text{ more energy}",
    "diagramDescription": "Cross-section showing seismic focus (hypocentre) beneath crust and epicentre directly on surface.",
    "realWorldExample": "Structural base-isolation dampers in earthquake-resistant high-rise towers.",
    "mnemonicOrMemoryHook": "Focus is inside the Earth; Epicentre is directly above it on the surface!",
    "davExamTip": "A magnitude 7 earthquake has 1000 times the wave amplitude and ~30,000 times more energy than magnitude 5.",
    "quickQuiz": {
      "question": "The point on Earth's surface directly above the seismic focus is known as:",
      "options": [
        "Fault line",
        "Epicentre",
        "Core",
        "Tectonic plate"
      ],
      "correctIndex": 1,
      "explanation": "The epicentre is the point on the surface directly above the underground focus where the earthquake originates."
    }
  },
  {
    "id": 34,
    "title": "Laws of Reflection of Light",
    "classGrade": "Class 8",
    "subject": "Physics",
    "category": "Optics",
    "iconName": "Sun",
    "coreDefinition": "1st Law: The angle of incidence equals the angle of reflection (i = r). 2nd Law: Incident ray, reflected ray, and the normal at point of incidence all lie in the same plane.",
    "keyFormulaOrLaw": "\\angle i = \\angle r; \\quad \\text{Normal } N \\perp \\text{Reflecting Surface}",
    "diagramDescription": "Light ray striking mirror at normal, showing symmetric angle i and angle r.",
    "realWorldExample": "Periscopes in submarines, kaleidoscope optical patterns, rearview mirrors.",
    "mnemonicOrMemoryHook": "i equals r: Always measured from the NORMAL, never from the mirror surface!",
    "davExamTip": "Never measure angle of incidence from mirror surface; always measure from normal perpendicular.",
    "quickQuiz": {
      "question": "If a ray strikes a plane mirror at an angle of 30° to the mirror surface, what is the angle of reflection?",
      "options": [
        "30°",
        "60°",
        "90°",
        "45°"
      ],
      "correctIndex": 1,
      "explanation": "Angle with normal = 90° - 30° = 60°. Since i = r, angle of reflection is 60°."
    }
  },
  {
    "id": 35,
    "title": "Plane Mirror Images: Lateral Inversion",
    "classGrade": "Class 8",
    "subject": "Physics",
    "category": "Optics",
    "iconName": "Eye",
    "coreDefinition": "Images formed by a plane mirror are virtual, erect, identical in size, at equal distance behind mirror, and laterally inverted (left appears right).",
    "keyFormulaOrLaw": "d_{\\text{image}} = d_{\\text{object}}; \\; h_i = h_o; \\; \\text{Magnification } m = +1",
    "diagramDescription": "Ray diagram showing virtual rays projecting behind plane mirror to form virtual image.",
    "realWorldExample": "AMBULANCE written inverted on emergency vehicles so drivers see it correctly in rear-view mirrors.",
    "mnemonicOrMemoryHook": "V-E-S-E-L: Virtual, Erect, Same size, Equal distance, Laterally inverted.",
    "davExamTip": "Virtual images cannot be caught on a screen because real light rays do not actually intersect.",
    "quickQuiz": {
      "question": "Why is the word 'AMBULANCE' written in reverse on the front of emergency vehicles?",
      "options": [
        "Stylistic custom",
        "Due to lateral inversion in rear-view mirrors",
        "To prevent reflection",
        "Aerodynamic design"
      ],
      "correctIndex": 1,
      "explanation": "Drivers see it laterally inverted in their rear-view mirrors, reading it normally as 'AMBULANCE'."
    }
  },
  {
    "id": 36,
    "title": "Dispersion of Light & Newton's Colour Disc",
    "classGrade": "Class 7/8",
    "subject": "Physics",
    "category": "Optics",
    "iconName": "Sparkles",
    "coreDefinition": "The splitting of white light into its 7 component colors (VIBGYOR) when passing through a refracting medium like a glass prism. Recombines into white light on rotating Newton's disc.",
    "keyFormulaOrLaw": "\\text{White Light} \\xrightarrow{\\text{Prism}} \\text{V-I-B-G-Y-O-R}; \\quad \\lambda_{\\text{red}} > \\lambda_{\\text{violet}}",
    "diagramDescription": "Glass triangular prism bending white beam and fanning out spectrum from Red (least bent) to Violet (most bent).",
    "realWorldExample": "Natural rainbows formed by atmospheric raindrops acting as microscopic prisms.",
    "mnemonicOrMemoryHook": "VIBGYOR: Violet bends most (slowest in glass); Red bends least (fastest).",
    "davExamTip": "Red light has the longest wavelength and is refracted the least; violet is refracted the most.",
    "quickQuiz": {
      "question": "Which color of white light bends the most when passing through a glass prism?",
      "options": [
        "Red",
        "Yellow",
        "Green",
        "Violet"
      ],
      "correctIndex": 3,
      "explanation": "Violet has the shortest wavelength and bends (refracts) the most."
    }
  },
  {
    "id": 37,
    "title": "Refraction of Light & Snell's Law",
    "classGrade": "Class 8",
    "subject": "Physics",
    "category": "Optics",
    "iconName": "Glasses",
    "coreDefinition": "The bending of light when it passes obliquely from one optical medium to another due to change in speed. Bends toward normal from rarer to denser; away from normal from denser to rarer.",
    "keyFormulaOrLaw": "n_1 \\sin i = n_2 \\sin r; \\quad n = \\frac{c}{v}",
    "diagramDescription": "Ray entering glass slab from air bending toward normal, then emerging parallel to incident ray.",
    "realWorldExample": "Pencil appearing bent in a glass of water; swimming pool bottoms appearing shallower.",
    "mnemonicOrMemoryHook": "Rarer to Denser -> Bends toward normal (slowing down)!",
    "davExamTip": "Lateral displacement occurs through a parallel glass slab, where emergent ray is parallel to incident ray.",
    "quickQuiz": {
      "question": "When a ray of light passes from air into glass, it:",
      "options": [
        "Speeds up and bends away from normal",
        "Slows down and bends toward normal",
        "Continues undeflected",
        "Reflects totally"
      ],
      "correctIndex": 1,
      "explanation": "Glass is optically denser than air, so light slows down and refracts toward the normal."
    }
  },
  {
    "id": 38,
    "title": "Solar System & Planetary Orbits",
    "classGrade": "Class 8",
    "subject": "Physics",
    "category": "Astronomy",
    "iconName": "Globe",
    "coreDefinition": "8 planets revolving around Sun in elliptical orbits: Terrestrial inner planets (Mercury, Venus, Earth, Mars) and Jovian gas giants (Jupiter, Saturn, Uranus, Neptune). Separated by Asteroid Belt.",
    "keyFormulaOrLaw": "F_g = G \\frac{M m}{r^2}; \\quad \\text{Period: } T^2 \\propto r^3 \\; (\\text{Kepler's 3rd Law})",
    "diagramDescription": "Sun at center with concentric orbital ellipses and Asteroid Belt between Mars and Jupiter.",
    "realWorldExample": "Satellite launch trajectories and planetary alignment communication windows.",
    "mnemonicOrMemoryHook": "My Very Educated Mother Just Served Us Noodles (Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune).",
    "davExamTip": "Venus is the hottest planet (greenhouse effect) and rotates clockwise (retrograde).",
    "quickQuiz": {
      "question": "Where is the Asteroid Belt located in our solar system?",
      "options": [
        "Between Earth and Mars",
        "Between Mars and Jupiter",
        "Between Jupiter and Saturn",
        "Beyond Neptune"
      ],
      "correctIndex": 1,
      "explanation": "The Asteroid Belt lies between the orbits of Mars (inner rocky) and Jupiter (outer gas giant)."
    }
  },
  {
    "id": 39,
    "title": "Work, Energy and Mechanical Power",
    "classGrade": "Class 8/Foundation",
    "subject": "Physics",
    "category": "Mechanics",
    "iconName": "Zap",
    "coreDefinition": "Work is done when a force produces displacement along its line of action. Energy is the capacity to do work. Power is the rate of doing work.",
    "keyFormulaOrLaw": "W = F \\cdot s \\cos\\theta; \\quad P = \\frac{W}{t}; \\quad 1\\text{ Joule} = 1\\text{ N}\\cdot\\text{m}; \\quad 1\\text{ Watt} = 1\\text{ J/s}",
    "diagramDescription": "Force vector acting at angle theta to displacement vector s.",
    "realWorldExample": "Lifting school bags up stairs, horsepower rating of water pumps.",
    "mnemonicOrMemoryHook": "No displacement = NO work! (Holding a 50 kg luggage motionless does zero mechanical work).",
    "davExamTip": "Work is zero if displacement is perpendicular to force (e.g., coolie carrying load on flat ground).",
    "quickQuiz": {
      "question": "A porter carries 20 kg on his head and stands stationary for 10 minutes. How much mechanical work was done?",
      "options": [
        "200 J",
        "2000 J",
        "Zero",
        "Depends on gravity"
      ],
      "correctIndex": 2,
      "explanation": "Since there is no displacement (s = 0), work done is zero."
    }
  },
  {
    "id": 40,
    "title": "Kinetic vs Gravitational Potential Energy",
    "classGrade": "Class 8/Foundation",
    "subject": "Physics",
    "category": "Mechanics",
    "iconName": "Activity",
    "coreDefinition": "Kinetic Energy (KE) is energy possessed by a body due to its motion. Potential Energy (PE) is stored energy due to position or height above ground. Mechanical energy is conserved.",
    "keyFormulaOrLaw": "KE = \\frac{1}{2} m v^2; \\quad PE = m g h; \\quad E_{\\text{mech}} = KE + PE = \\text{constant}",
    "diagramDescription": "Swinging pendulum converting all PE at peak amplitude to maximum KE at lowest equilibrium point.",
    "realWorldExample": "Hydroelectric dams storing water PE behind high barriers to drive electric turbines.",
    "mnemonicOrMemoryHook": "Double the velocity -> Quadruple the Kinetic Energy (v squared factor)!",
    "davExamTip": "If speed doubles, KE increases 4 times because KE depends on v^2.",
    "quickQuiz": {
      "question": "If the speed of a moving car is doubled, its kinetic energy becomes:",
      "options": [
        "2 times",
        "4 times",
        "8 times",
        "Remains same"
      ],
      "correctIndex": 1,
      "explanation": "KE = 1/2 m v^2. When v is doubled, (2v)^2 = 4v^2, so KE quadruples."
    }
  },
  {
    "id": 41,
    "title": "Archimedes' Principle & Law of Floatation",
    "classGrade": "Class 8/Foundation",
    "subject": "Physics",
    "category": "Fluids",
    "iconName": "Anchor",
    "coreDefinition": "When a body is partially or fully immersed in a fluid, it experiences an upward buoyant force equal to the weight of fluid displaced. A body floats if buoyant force equals its total weight.",
    "keyFormulaOrLaw": "F_{\\text{buoyant}} = \\rho_{\\text{fluid}} \\cdot V_{\\text{submerged}} \\cdot g = W_{\\text{displaced fluid}}",
    "diagramDescription": "Submerged block with downward gravity vector mg opposed by upward buoyant vector F_b.",
    "realWorldExample": "Massive steel ships floating because hollow shape displaces water weight greater than ship weight; submarines diving.",
    "mnemonicOrMemoryHook": "Body sinks if Density_object > Density_liquid; floats if Density_object <= Density_liquid.",
    "davExamTip": "Hydrometers (measuring liquid density) and lactometers (milk purity) are based on Archimedes' principle.",
    "quickQuiz": {
      "question": "A solid block of density 1.2 g/cm³ is placed in water (density 1.0 g/cm³). The block will:",
      "options": [
        "Float partially",
        "Float completely",
        "Sink to the bottom",
        "Remain suspended at midpoint"
      ],
      "correctIndex": 2,
      "explanation": "Since density of object (1.2) > density of water (1.0), it will sink to the bottom."
    }
  },
  {
    "id": 42,
    "title": "Simple Machines & Mechanical Advantage",
    "classGrade": "Class 8/Foundation",
    "subject": "Physics",
    "category": "Mechanics",
    "iconName": "Wrench",
    "coreDefinition": "Devices that change the magnitude, direction, or speed of force to make work easier. Mechanical Advantage (MA) is the ratio of load overcome to effort applied.",
    "keyFormulaOrLaw": "MA = \\frac{\\text{Load}}{\\text{Effort}}; \\quad VR = \\frac{d_{\\text{effort}}}{d_{\\text{load}}}; \\quad \\text{Efficiency } \\eta = \\frac{MA}{VR} \\times 100\\%",
    "diagramDescription": "Class I lever (crowbar) with fulcrum between effort and load.",
    "realWorldExample": "Nutcrackers (Class II), scissors (Class I), tweezers (Class III), pulleys, and inclined ramps.",
    "mnemonicOrMemoryHook": "F-L-E = 1-2-3: Fulcrum in middle = Class 1; Load in middle = Class 2; Effort in middle = Class 3.",
    "davExamTip": "Efficiency of a practical machine is always strictly less than 100% due to friction and string weight.",
    "quickQuiz": {
      "question": "A machine raises a load of 500 N using an effort of 100 N. What is its Mechanical Advantage (MA)?",
      "options": [
        "0.2",
        "4",
        "5",
        "50"
      ],
      "correctIndex": 2,
      "explanation": "MA = Load / Effort = 500 N / 100 N = 5."
    }
  },
  {
    "id": 43,
    "title": "Physical vs Chemical Changes",
    "classGrade": "Class 7/8",
    "subject": "Chemistry",
    "category": "General",
    "iconName": "RefreshCw",
    "coreDefinition": "Physical change alters state, shape, or appearance without creating new substances (usually reversible). Chemical change forms new substances with different bonds and properties (irreversible).",
    "keyFormulaOrLaw": "\\text{Physical: } H_2O(s) \\rightleftharpoons H_2O(l); \\quad \\text{Chemical: } 2Mg + O_2 \\rightarrow 2MgO",
    "diagramDescription": "Molecular rearrangement diagram: Ice melting vs Magnesium burning with dazzling white flame.",
    "realWorldExample": "Boiling water (physical), burning paper or digestion of food (chemical).",
    "mnemonicOrMemoryHook": "Reversible state = Physical; New chemical identity = Chemical!",
    "davExamTip": "Curdling of milk, rusting of iron, and burning candle wax are chemical; melting candle wax is physical.",
    "quickQuiz": {
      "question": "Which of the following is a chemical change?",
      "options": [
        "Melting of ice",
        "Dissolving sugar in water",
        "Rusting of iron",
        "Boiling water into steam"
      ],
      "correctIndex": 2,
      "explanation": "Rusting forms hydrated ferric oxide (new chemical compound), making it a chemical change."
    }
  },
  {
    "id": 44,
    "title": "Metals and Non-Metals: Physical Properties",
    "classGrade": "Class 8",
    "subject": "Chemistry",
    "category": "Inorganic",
    "iconName": "Hammer",
    "coreDefinition": "Metals are malleable (beaten into thin sheets), ductile (drawn into wires), sonorous (ringing sound), lustrous, and good thermal/electrical conductors. Non-metals are brittle and insulators.",
    "keyFormulaOrLaw": "\\text{Exceptions: } Hg \\text{ (liquid metal)}, Na/K \\text{ (soft metals cut with knife)}, C_{\\text{graphite}} \\text{ (conductor)}",
    "diagramDescription": "Comparison chart of metallic lattice with free delocalized electron sea vs non-metal covalent lattice.",
    "realWorldExample": "Gold leaf for sweets (malleability), copper cables for home wiring (ductility and conductivity).",
    "mnemonicOrMemoryHook": "Malleable = Sheets (Hammer), Ductile = Wires (Drawn)!",
    "davExamTip": "Mercury is the ONLY metal liquid at room temperature; Bromine is the ONLY liquid non-metal.",
    "quickQuiz": {
      "question": "Which metal can be easily cut with an ordinary kitchen knife?",
      "options": [
        "Iron",
        "Copper",
        "Sodium",
        "Aluminium"
      ],
      "correctIndex": 2,
      "explanation": "Sodium (and potassium) are alkali metals so soft that they can be cut with a knife."
    }
  },
  {
    "id": 45,
    "title": "Reactivity Series of Metals & Displacement",
    "classGrade": "Class 8",
    "subject": "Chemistry",
    "category": "Inorganic",
    "iconName": "Flame",
    "coreDefinition": "A vertical arrangement of metals in decreasing order of chemical reactivity. A more reactive metal displaces a less reactive metal from its aqueous salt solution.",
    "keyFormulaOrLaw": "K > Na > Ca > Mg > Al > Zn > Fe > Pb > [H] > Cu > Hg > Ag > Au; \\quad Fe + CuSO_4 \\rightarrow FeSO_4 + Cu",
    "diagramDescription": "Test tube with iron nail turning blue copper sulfate into light green ferrous sulfate with reddish copper deposit.",
    "realWorldExample": "Zinc sacrificial galvanising on ships to prevent steel rusting.",
    "mnemonicOrMemoryHook": "Please Stop Calling Me A Careless Zebra, Instead Try Learning How Copper Saves Gold!",
    "davExamTip": "Copper CANNOT displace iron from ferrous sulfate solution because copper is below iron in reactivity.",
    "quickQuiz": {
      "question": "What happens when an iron nail is immersed in blue copper sulfate solution?",
      "options": [
        "Solution turns green and copper deposits on nail",
        "Solution turns colorless",
        "No reaction occurs",
        "Nail dissolves completely"
      ],
      "correctIndex": 0,
      "explanation": "Iron is more reactive than copper; it displaces copper to form pale green FeSO4 and reddish-brown copper metal."
    }
  },
  {
    "id": 46,
    "title": "Reaction of Metals with Acids & Hydrogen Pop Test",
    "classGrade": "Class 8",
    "subject": "Chemistry",
    "category": "Inorganic",
    "iconName": "AlertCircle",
    "coreDefinition": "Active metals react with dilute mineral acids (HCl, H2SO4) to produce metal salt and liberate hydrogen gas, confirmed by a characteristic 'pop' sound near a burning matchstick.",
    "keyFormulaOrLaw": "\\text{Metal} + \\text{Dilute Acid} \\rightarrow \\text{Salt} + H_2(g); \\quad Zn + 2HCl \\rightarrow ZnCl_2 + H_2\\uparrow",
    "diagramDescription": "Delivery tube bubbling gas into soap water; burning candle producing 'pop' sound with soap bubbles.",
    "realWorldExample": "Zinc reaction in school laboratories for hydrogen gas preparation.",
    "mnemonicOrMemoryHook": "Pop Sound = Pure Hydrogen Gas burning to form water vapor!",
    "davExamTip": "Copper does NOT react with dilute hydrochloric acid because it is less reactive than hydrogen.",
    "quickQuiz": {
      "question": "Which gas produces a distinctive 'pop' sound when a burning splinter is brought near it?",
      "options": [
        "Oxygen",
        "Carbon dioxide",
        "Hydrogen",
        "Nitrogen"
      ],
      "correctIndex": 2,
      "explanation": "Hydrogen burns explosively in air on a small scale, producing the famous 'pop' sound."
    }
  },
  {
    "id": 47,
    "title": "Synthetic Fibres: Nylon, Polyester & Rayon",
    "classGrade": "Class 8",
    "subject": "Chemistry",
    "category": "Polymers",
    "iconName": "Scissors",
    "coreDefinition": "Man-made polymers formed by chemical polymerisation of petrochemical monomers. Rayon is artificial silk (from wood pulp); Nylon is first fully synthetic fibre (stronger than steel wire).",
    "keyFormulaOrLaw": "\\text{Rayon: Regenerated cellulose}; \\quad \\text{Nylon: Polyamide from coal, water, air}; \\quad \\text{PET: Polyester}",
    "diagramDescription": "Polymer chain diagram showing repeating chemical monomer units.",
    "realWorldExample": "Nylon parachutes and mountaineering ropes, PET plastic water bottles, polyester wrinkle-free clothing.",
    "mnemonicOrMemoryHook": "Rayon = Semi-synthetic (wood pulp base); Nylon = 100% Fully Synthetic!",
    "davExamTip": "Nylon thread is actually stronger than an equivalent thickness of steel wire.",
    "quickQuiz": {
      "question": "Which synthetic fibre is also known as 'Artificial Silk' because of its lustrous texture?",
      "options": [
        "Nylon",
        "Rayon",
        "Acrylic",
        "Terylene"
      ],
      "correctIndex": 1,
      "explanation": "Rayon is prepared by chemical treatment of natural wood pulp and has silk-like luster."
    }
  },
  {
    "id": 48,
    "title": "Plastics: Thermoplastics vs Thermosetting",
    "classGrade": "Class 8",
    "subject": "Chemistry",
    "category": "Polymers",
    "iconName": "Layers",
    "coreDefinition": "Thermoplastics soften on heating and can be repeatedly remoulded (linear polymer chains). Thermosetting plastics take a permanent shape when moulded and cannot be softened by heating (cross-linked chains).",
    "keyFormulaOrLaw": "\\text{Thermoplastic: Polythene, PVC}; \\quad \\text{Thermosetting: Bakelite (switches), Melamine (crockery)}",
    "diagramDescription": "Linear chain lattice (slipping freely on heat) vs cross-linked network locked in rigid 3D bonds.",
    "realWorldExample": "Bakelite electrical plug switches and cooker handles that never melt under heat.",
    "mnemonicOrMemoryHook": "Thermo-plastic bends and melts; Thermo-set is set forever!",
    "davExamTip": "Bakelite is a poor conductor of heat and electricity, making it ideal for electrical switches and pan handles.",
    "quickQuiz": {
      "question": "Which plastic is used for making electrical switches and cookware handles?",
      "options": [
        "Polythene",
        "PVC",
        "Bakelite",
        "Polystyrene"
      ],
      "correctIndex": 2,
      "explanation": "Bakelite is a thermosetting plastic that does not soften on heating and is an electrical insulator."
    }
  },
  {
    "id": 49,
    "title": "Destructive Distillation of Coal",
    "classGrade": "Class 8",
    "subject": "Chemistry",
    "category": "Fossil Fuels",
    "iconName": "CloudRain",
    "coreDefinition": "Heating coal strongly in the absence of air. Yields three major commercial products: Coke (pure carbon residue), Coal Tar (thick black liquid for dyes/perfumes), and Coal Gas (fuel).",
    "keyFormulaOrLaw": "\\text{Coal} \\xrightarrow{\\Delta, \\text{ no } O_2} \\text{Coke}(s) + \\text{Coal Tar}(l) + \\text{Coal Gas}(g) + \\text{Ammoniacal Liquor}",
    "diagramDescription": "Two test-tube laboratory apparatus heating coal powder and bubbling gas through water.",
    "realWorldExample": "Coke used in blast furnaces to smelt iron ore; coal tar distilled into benzene and naphthalene balls.",
    "mnemonicOrMemoryHook": "Coke = Solid Carbon, Tar = Liquid chemicals, Gas = Gaseous fuel!",
    "davExamTip": "Carbonisation is the slow process of conversion of dead vegetation into coal under high temperature and pressure.",
    "quickQuiz": {
      "question": "What is the nearly pure carbon solid residue obtained from destructive distillation of coal?",
      "options": [
        "Coal Tar",
        "Coke",
        "Coal Gas",
        "Petroleum"
      ],
      "correctIndex": 1,
      "explanation": "Coke is a tough, porous, black substance that is an almost pure form of carbon (~98% C)."
    }
  },
  {
    "id": 50,
    "title": "Petroleum Refining & Fractional Distillation",
    "classGrade": "Class 8",
    "subject": "Chemistry",
    "category": "Fossil Fuels",
    "iconName": "Droplets",
    "coreDefinition": "Crude oil is a complex mixture of hydrocarbons separated into fractions based on differing boiling points in a tall fractionating column.",
    "keyFormulaOrLaw": "\\text{Crude Oil} \\xrightarrow{\\text{Fractionation}} \\text{LPG, Petrol, Kerosene, Diesel, Lubricating Oil, Bitumen}",
    "diagramDescription": "Tall fractionating tower with lowest boiling gases escaping at top and heaviest bitumen collecting at base.",
    "realWorldExample": "Bitumen used for road surfacing (replacing old coal tar); kerosene fuel for jet planes.",
    "mnemonicOrMemoryHook": "Lighter fractions boil first at the TOP; heavier residues remain at the BOTTOM!",
    "davExamTip": "Bitumen is a petroleum fraction used for surfacing roads and paints, not coal tar.",
    "quickQuiz": {
      "question": "Which petroleum product is nowadays used in place of coal tar for surfacing roads?",
      "options": [
        "Coke",
        "Bitumen",
        "Paraffin wax",
        "Lubricating oil"
      ],
      "correctIndex": 1,
      "explanation": "Bitumen, a heavy fraction of petroleum, has replaced coal tar for metalled road construction."
    }
  },
  {
    "id": 51,
    "title": "Combustion & The Fire Triangle",
    "classGrade": "Class 8",
    "subject": "Chemistry",
    "category": "Thermochemistry",
    "iconName": "Flame",
    "coreDefinition": "A chemical reaction between a fuel and oxygen that produces heat and light. Three essential requirements: Combustible Substance (Fuel), Supporter of Combustion (Oxygen), and Ignition Temperature.",
    "keyFormulaOrLaw": "\\text{Fuel} + O_2 \\rightarrow CO_2 + H_2O + \\text{Heat} + \\text{Light}",
    "diagramDescription": "Fire triangle interlocking three sides: Fuel, Heat, and Oxygen. Removing any one side extinguishes fire.",
    "realWorldExample": "Covering a person with a blanket when clothes catch fire to cut off atmospheric oxygen supply.",
    "mnemonicOrMemoryHook": "Fuel + Heat + O2 = Fire! Cut off any one, and the fire dies.",
    "davExamTip": "Ignition temperature is the lowest temperature at which a substance catches fire.",
    "quickQuiz": {
      "question": "Why does a blanket extinguish a person's clothes when on fire?",
      "options": [
        "Cools down the body",
        "Cuts off the supply of oxygen",
        "Removes the combustible cloth",
        "Lowers the ignition temperature"
      ],
      "correctIndex": 1,
      "explanation": "The blanket smothers the flame by depriving it of atmospheric oxygen (air)."
    }
  },
  {
    "id": 52,
    "title": "Structure of a Candle Flame",
    "classGrade": "Class 8",
    "subject": "Chemistry",
    "category": "Combustion",
    "iconName": "Sun",
    "coreDefinition": "A candle flame consists of three distinct zones: 1. Outermost Blue Non-Luminous Zone (complete combustion, hottest). 2. Middle Yellow Luminous Zone (incomplete combustion, unburnt carbon particles). 3. Innermost Black Dark Zone (unburnt wax vapors, least hot).",
    "keyFormulaOrLaw": "\\text{Outer Zone: Hottest (Complete)}; \\quad \\text{Middle: Moderately Hot (Luminous)}; \\quad \\text{Inner: Least Hot (Dark)}",
    "diagramDescription": "Candle flame diagram cross-section labeled with the 3 concentric zones and temperature scale.",
    "realWorldExample": "Goldsmiths using metallic blowpipes to direct the outermost blue zone onto gold to melt it.",
    "mnemonicOrMemoryHook": "Blue is Hottest (Complete), Yellow is Carbon Glow, Black is Cool Wax!",
    "davExamTip": "Goldsmiths blow the outermost non-luminous zone because it is the hottest region of the flame.",
    "quickQuiz": {
      "question": "Which zone of a candle flame is the hottest?",
      "options": [
        "Innermost dark zone",
        "Middle luminous yellow zone",
        "Outermost non-luminous blue zone",
        "Base zone"
      ],
      "correctIndex": 2,
      "explanation": "The outermost blue zone has excess oxygen, ensuring complete combustion and maximum temperature."
    }
  },
  {
    "id": 53,
    "title": "Calorific Value & Acid Rain",
    "classGrade": "Class 8",
    "subject": "Chemistry",
    "category": "Environmental",
    "iconName": "CloudRain",
    "coreDefinition": "Calorific value is the amount of heat energy produced on complete combustion of 1 kg of fuel (kJ/kg). Burning fossil fuels releases sulfur dioxide and nitrogen oxides that form acid rain.",
    "keyFormulaOrLaw": "\\text{Calorific Value} = \\frac{\\text{Heat Produced (kJ)}}{\\text{Mass of Fuel (kg)}}; \\quad SO_2 + H_2O \\rightarrow H_2SO_3; \\; 2NO_2 + H_2O \\rightarrow HNO_3 + HNO_2",
    "diagramDescription": "Atmospheric sulfur/nitrogen emissions reacting with rain clouds to produce acid rain falling on Taj Mahal.",
    "realWorldExample": "Hydrogen has the highest calorific value (150,000 kJ/kg); marble cancer degrading historical monuments.",
    "mnemonicOrMemoryHook": "Hydrogen fuels rockets because it packs 150,000 kJ per kilo!",
    "davExamTip": "Acid rain corrodes marble monuments (CaCO3 + H2SO4 -> CaSO4 + H2O + CO2), known as 'Marble Cancer'.",
    "quickQuiz": {
      "question": "Which fuel has the highest calorific value among the following?",
      "options": [
        "CNG",
        "LPG",
        "Hydrogen",
        "Petrol"
      ],
      "correctIndex": 2,
      "explanation": "Hydrogen has a calorific value of 150,000 kJ/kg, higher than LPG (55,000 kJ/kg) or petrol (45,000 kJ/kg)."
    }
  },
  {
    "id": 54,
    "title": "Acids, Bases & Chemical Indicators",
    "classGrade": "Class 7/8",
    "subject": "Chemistry",
    "category": "Analytical",
    "iconName": "Pipette",
    "coreDefinition": "Acids turn blue litmus red and taste sour. Bases turn red litmus blue, feel soapy, and taste bitter. Indicators change color in acidic or basic media (Litmus, Phenolphthalein, Turmeric, China Rose).",
    "keyFormulaOrLaw": "\\text{Acid: Blue Litmus } \\rightarrow \\text{ Red}; \\; \\text{Base: Red Litmus } \\rightarrow \\text{ Blue}; \\; \\text{Phenolphthalein: Pink in Base, Colorless in Acid}",
    "diagramDescription": "Color test tubes showing turmeric turning red with soap solution and phenolphthalein turning bright magenta in base.",
    "realWorldExample": "Cleaning yellow turmeric curry stains on a white shirt: turns reddish-brown when washed with alkaline soap.",
    "mnemonicOrMemoryHook": "B-B-B: Base turns Blue litmus and feels Bitter!",
    "davExamTip": "Phenolphthalein remains colorless in acidic or neutral solutions; it turns pink ONLY in basic solutions.",
    "quickQuiz": {
      "question": "What color does phenolphthalein turn when added to sodium hydroxide (NaOH) solution?",
      "options": [
        "Blue",
        "Yellow",
        "Pink / Magenta",
        "Remains colorless"
      ],
      "correctIndex": 2,
      "explanation": "Phenolphthalein is a synthetic indicator that turns deep pink in basic solutions like NaOH."
    }
  },
  {
    "id": 55,
    "title": "Neutralisation Reaction & Salt Formation",
    "classGrade": "Class 7/8",
    "subject": "Chemistry",
    "category": "Inorganic",
    "iconName": "Check",
    "coreDefinition": "Reaction between an acid and a base to form salt and water with evolution of heat. Used medically to treat acidity (antacids) and insect stings.",
    "keyFormulaOrLaw": "\\text{Acid} + \\text{Base} \\rightarrow \\text{Salt} + \\text{Water} + \\text{Heat}; \\quad HCl + NaOH \\rightarrow NaCl + H_2O + \\Delta",
    "diagramDescription": "Calorimeter cup recording temperature rise during mixing of acid and alkali.",
    "realWorldExample": "Taking milk of magnesia (magnesium hydroxide) to relieve stomach hyperacidity; applying baking soda on bee sting.",
    "mnemonicOrMemoryHook": "Antacid cures stomach acid; Calamine cures formic acid bee sting!",
    "davExamTip": "A bee sting contains formic acid (methanoic acid); it is neutralised by mild bases like baking soda or calamine.",
    "quickQuiz": {
      "question": "Which mild base is commonly consumed as an antacid to relieve stomach acidity?",
      "options": [
        "Hydrochloric acid",
        "Sodium hydroxide",
        "Magnesium hydroxide (Milk of Magnesia)",
        "Sulfuric acid"
      ],
      "correctIndex": 2,
      "explanation": "Milk of Magnesia (Mg(OH)2) is a non-toxic mild base that neutralises excess hydrochloric acid in the stomach."
    }
  },
  {
    "id": 56,
    "title": "Atomic Structure: Subatomic Particles & Models",
    "classGrade": "Class 8/Foundation",
    "subject": "Chemistry",
    "category": "Atomic",
    "iconName": "Atom",
    "coreDefinition": "An atom consists of a dense central nucleus containing positively charged protons and neutral neutrons, surrounded by negatively charged electrons orbiting in discrete energy shells.",
    "keyFormulaOrLaw": "A = Z + N; \\quad Z = p = e^-; \\quad \\text{Rutherford alpha scattering proved tiny dense positive nucleus}",
    "diagramDescription": "Planetary atomic model showing nucleus with orbiting electron probability shells.",
    "realWorldExample": "Nuclear energy reactors, carbon dating archeological artifacts.",
    "mnemonicOrMemoryHook": "P-E-N: Protons (Positive), Electrons (Negative), Neutrons (Neutral)!",
    "davExamTip": "Mass of an atom is almost entirely concentrated in the nucleus (protons + neutrons = Mass Number A).",
    "quickQuiz": {
      "question": "Who discovered the existence of the atomic nucleus via the gold foil scattering experiment?",
      "options": [
        "J.J. Thomson",
        "Ernest Rutherford",
        "James Chadwick",
        "John Dalton"
      ],
      "correctIndex": 1,
      "explanation": "Rutherford discovered the atomic nucleus in 1911 by firing alpha particles at thin gold foil."
    }
  },
  {
    "id": 57,
    "title": "Valency & Criss-Cross Chemical Formulas",
    "classGrade": "Class 8/Foundation",
    "subject": "Chemistry",
    "category": "Formulae",
    "iconName": "Hash",
    "coreDefinition": "Valency is the combining capacity of an atom determined by valence electrons. In the criss-cross method, symbols are written with valencies underneath and cross-multiplied to obtain the empirical formula.",
    "keyFormulaOrLaw": "\\text{Al}^{3+} + \\text{O}^{2-} \\xrightarrow{\\text{Criss-Cross}} \\text{Al}_2\\text{O}_3; \\quad \\text{Ca}^{2+} + \\text{CO}_3^{2-} \\rightarrow \\text{CaCO}_3",
    "diagramDescription": "Arrows crossing over valency superscripts down into subscript indices.",
    "realWorldExample": "Formulating pharmaceutical drugs and determining fertilizer compound compositions.",
    "mnemonicOrMemoryHook": "Swap and Drop: Valency of first becomes subscript of second!",
    "davExamTip": "When valency numbers share a common factor (like in Ca2O2), reduce them to the simplest ratio: CaO.",
    "quickQuiz": {
      "question": "What is the correct chemical formula for Aluminium Oxide?",
      "options": [
        "AlO",
        "Al2O",
        "AlO3",
        "Al2O3"
      ],
      "correctIndex": 3,
      "explanation": "Al has valency 3 and O has valency 2. Criss-crossing valencies yields Al2O3."
    }
  },
  {
    "id": 58,
    "title": "Types of Chemical Reactions",
    "classGrade": "Class 8/Foundation",
    "subject": "Chemistry",
    "category": "Reactions",
    "iconName": "Shuffle",
    "coreDefinition": "1. Combination (A + B -> AB). 2. Decomposition (AB -> A + B). 3. Displacement (A + BC -> AC + B). 4. Double Displacement (AB + CD -> AD + CB).",
    "keyFormulaOrLaw": "\\text{Comb: } C + O_2 \\rightarrow CO_2; \\; \\text{Decomp: } 2Pb(NO_3)_2 \\xrightarrow{\\Delta} 2PbO + 4NO_2 + O_2; \\; \\text{Double: } AgNO_3 + NaCl \\rightarrow AgCl\\downarrow + NaNO_3",
    "diagramDescription": "Iconic block diagrams illustrating element exchange mechanisms.",
    "realWorldExample": "Digestion breaking complex starch into glucose (decomposition), precipitation in effluent water treatment.",
    "mnemonicOrMemoryHook": "Combine = Join, Decompose = Break, Displace = Kick out, Double = Swap partners!",
    "davExamTip": "Precipitation reactions are double displacement reactions where an insoluble solid precipitate forms.",
    "quickQuiz": {
      "question": "What type of reaction is: 2H2O -> 2H2 + O2 (via electrolysis)?",
      "options": [
        "Combination reaction",
        "Decomposition reaction",
        "Displacement reaction",
        "Neutralisation reaction"
      ],
      "correctIndex": 1,
      "explanation": "A single compound (water) breaks down into simpler substances (hydrogen and oxygen), which is decomposition."
    }
  },
  {
    "id": 59,
    "title": "Corrosion of Iron & Galvanisation",
    "classGrade": "Class 8",
    "subject": "Chemistry",
    "category": "Corrosion",
    "iconName": "Shield",
    "coreDefinition": "Corrosion is slow degradation of metals by atmospheric moisture and oxygen. Rusting of iron forms hydrated iron(III) oxide. Prevented by oiling, painting, and galvanisation (coating with zinc).",
    "keyFormulaOrLaw": "4Fe + 3O_2 + 2x H_2O \\rightarrow 2Fe_2O_3\\cdot xH_2O \\; (\\text{Rust})",
    "diagramDescription": "Three test-tube experiment: dry air (no rust), boiled water covered in oil (no rust), exposed water and air (rusted).",
    "realWorldExample": "Galvanised iron corrugated roof sheets and iron water pipes zinc-coated.",
    "mnemonicOrMemoryHook": "Both Air (O2) AND Water are strictly necessary for iron to rust!",
    "davExamTip": "Galvanisation protects iron even if the zinc coating is scratched, because zinc sacrifices itself preferentially.",
    "quickQuiz": {
      "question": "Galvanisation is the process of coating iron articles with a protective layer of:",
      "options": [
        "Copper",
        "Zinc",
        "Tin",
        "Silver"
      ],
      "correctIndex": 1,
      "explanation": "Iron is coated with molten zinc to protect it from rusting, known as galvanisation."
    }
  },
  {
    "id": 60,
    "title": "Water Purification & Potable Water",
    "classGrade": "Class 8",
    "subject": "Chemistry",
    "category": "Water",
    "iconName": "Droplet",
    "coreDefinition": "Water safe for drinking is called potable water. Municipal purification involves: Sedimentation, Decantation, Filtration (sand/gravel beds), and Chlorination (kills pathogenic bacteria).",
    "keyFormulaOrLaw": "Cl_2 + H_2O \\rightarrow HCl + HOCl \\; (\\text{Hypochlorous acid kills pathogens})",
    "diagramDescription": "Flow diagram of water treatment plant from raw reservoir to coagulation, filtration, chlorination, and storage.",
    "realWorldExample": "Municipal water supply in Muzaffarpur city, RO and UV purification systems in DAV schools.",
    "mnemonicOrMemoryHook": "Boiling kills germs; Chlorine tablets purify flood water!",
    "davExamTip": "Over-chlorination is harmful; exact chlorination dosage must be regulated according to water volume.",
    "quickQuiz": {
      "question": "Which chemical tablet is commonly added to clear water to disinfect and kill harmful microbes?",
      "options": [
        "Sodium chloride",
        "Chlorine tablet",
        "Copper sulfate",
        "Baking soda"
      ],
      "correctIndex": 1,
      "explanation": "Chlorine tablets or bleaching powder release chlorine that disinfects water by killing bacteria."
    }
  },
  {
    "id": 61,
    "title": "The Cell Theory of Life",
    "classGrade": "Class 8",
    "subject": "Biology",
    "category": "Cytology",
    "iconName": "Grid",
    "coreDefinition": "Formulated by Schleiden, Schwann, and Virchow. Three core tenets: 1. All living organisms are composed of one or more cells. 2. The cell is the basic structural and functional unit of life. 3. All cells arise from pre-existing cells (Omnis cellula e cellula).",
    "keyFormulaOrLaw": "\\text{Virchow (1855): } \\text{'Omnis cellula e cellula'} \\implies \\text{Pre-existing cells divide}",
    "diagramDescription": "Diagram showing single-celled zygote dividing into blastomeres and tissues.",
    "realWorldExample": "Skin wound healing through mitotic division of neighbouring epidermal cells.",
    "mnemonicOrMemoryHook": "S-S-V: Schleiden (Plants), Schwann (Animals), Virchow (Pre-existing division)!",
    "davExamTip": "Viruses are exceptions to classical cell theory because they lack cellular machinery outside a host.",
    "quickQuiz": {
      "question": "Who stated that 'all cells arise from pre-existing cells'?",
      "options": [
        "Robert Hooke",
        "Antonie van Leeuwenhoek",
        "Rudolf Virchow",
        "Robert Brown"
      ],
      "correctIndex": 2,
      "explanation": "Rudolf Virchow added the third tenet to cell theory in 1855: Omnis cellula e cellula."
    }
  },
  {
    "id": 62,
    "title": "Cell Organelles & Their Functions",
    "classGrade": "Class 8",
    "subject": "Biology",
    "category": "Cytology",
    "iconName": "Cpu",
    "coreDefinition": "Organelles perform specialized metabolic tasks. Nucleus (brain of the cell, contains chromatin/DNA), Mitochondria (powerhouse, ATP synthesis), Ribosomes (protein synthesis), Lysosomes (suicide bags with digestive enzymes).",
    "keyFormulaOrLaw": "\\text{Mitochondria: ATP Cellular Currency}; \\; \\text{Lysosomes: Hydrolytic Enzymes}; \\; \\text{Nucleus: Genetic Blueprint}",
    "diagramDescription": "Eukaryotic cell showing nucleus with pores, folded mitochondrial cristae, and endoplasmic reticulum.",
    "realWorldExample": "Muscle cells packed with thousands of mitochondria to generate ATP for running and sports.",
    "mnemonicOrMemoryHook": "Mighty Mitochondria makes Power; Lysosome is the Cleanup Crew!",
    "davExamTip": "Lysosomes are called 'suicide bags' because if cell metabolism is damaged, they burst and digest the entire cell.",
    "quickQuiz": {
      "question": "Which organelle is known as the 'Powerhouse of the Cell'?",
      "options": [
        "Ribosome",
        "Mitochondrion",
        "Golgi apparatus",
        "Lysosome"
      ],
      "correctIndex": 1,
      "explanation": "Mitochondria produce ATP (adenosine triphosphate), the energy currency of cellular processes."
    }
  },
  {
    "id": 63,
    "title": "Plant Cell vs Animal Cell Differences",
    "classGrade": "Class 8",
    "subject": "Biology",
    "category": "Cytology",
    "iconName": "DivideCircle",
    "coreDefinition": "Plant cells possess a rigid cellulose cell wall, chloroplasts (for photosynthesis), and a large central permanent vacuole. Animal cells lack cell walls and chloroplasts, and have small, transient vacuoles.",
    "keyFormulaOrLaw": "\\text{Plant Cell: Cell Wall } + \\text{ Plastids } + \\text{ Large Central Vacuole}; \\quad \\text{Animal: Only Cell Membrane}",
    "diagramDescription": "Side-by-side comparison diagram showing rectangular plant cell with green chloroplasts vs rounded animal cell.",
    "realWorldExample": "Plants standing erect without bones because rigid cellulose cell walls provide structural turgor pressure.",
    "mnemonicOrMemoryHook": "Wall, Vacuole, Plastid = Plant's VIP Trio!",
    "davExamTip": "Centrosomes/centrioles are present in animal cells to guide spindle fibers, but absent in higher plant cells.",
    "quickQuiz": {
      "question": "Which of the following structures is found in plant cells but strictly absent in animal cells?",
      "options": [
        "Cell membrane",
        "Mitochondria",
        "Cellulose Cell Wall",
        "Endoplasmic reticulum"
      ],
      "correctIndex": 2,
      "explanation": "Plant cells have an outer cellulose cell wall for structural rigidity, which animal cells lack."
    }
  },
  {
    "id": 64,
    "title": "Microorganisms: Four Major Groups & Viruses",
    "classGrade": "Class 8",
    "subject": "Biology",
    "category": "Microbiology",
    "iconName": "Bug",
    "coreDefinition": "Microscopic organisms classified into four major groups: Bacteria (Lactobacillus), Fungi (Yeast, Rhizopus), Protozoa (Amoeba, Paramecium), and Algae (Spirogyra). Viruses reproduce only inside host cells.",
    "keyFormulaOrLaw": "\\text{Groups: Bacteria, Fungi, Protozoa, Algae}; \\quad \\text{Viruses: Acellular obligate intracellular parasites}",
    "diagramDescription": "Morphology sketches: rod/spiral bacteria, bread mold sporangium, amoeba pseudopodia, and bacteriophage virus.",
    "realWorldExample": "Fermentation of curd by Lactobacillus; athlete's foot caused by fungal infection.",
    "mnemonicOrMemoryHook": "B-F-P-A: Bacteria, Fungi, Protozoa, Algae — plus boundary-dwelling Viruses!",
    "davExamTip": "Antibiotics are effective against bacterial infections, but completely ineffective against viral diseases (like common cold or flu).",
    "quickQuiz": {
      "question": "Why are antibiotics ineffective against the common cold or influenza?",
      "options": [
        "Viruses have thick bacterial walls",
        "Cold is caused by viruses, not bacteria",
        "Antibiotics strengthen viruses",
        "Colds are not infectious"
      ],
      "correctIndex": 1,
      "explanation": "Antibiotics target bacterial cell wall synthesis or metabolic pathways; viruses lack these mechanisms."
    }
  },
  {
    "id": 65,
    "title": "Nitrogen Cycle & Biological Nitrogen Fixation",
    "classGrade": "Class 8",
    "subject": "Biology",
    "category": "Ecology",
    "iconName": "RotateCcw",
    "coreDefinition": "The cycling of nitrogen through the biosphere. Rhizobium bacteria living symbiotically in root nodules of leguminous plants fix atmospheric N2 into usable nitrates. Returned via denitrifying bacteria.",
    "keyFormulaOrLaw": "N_2(g) \\xrightarrow{\\text{Rhizobium}} NO_3^- \\xrightarrow{\\text{Plants}} \\text{Proteins} \\xrightarrow{\\text{Denitrifiers}} N_2(g)",
    "diagramDescription": "Circular diagram of Nitrogen cycle showing fixation, assimilation, ammonification, nitrification, and denitrification.",
    "realWorldExample": "Farmers growing pulses (peas, grams) in crop rotation to naturally replenish soil nitrogen without fertilizers.",
    "mnemonicOrMemoryHook": "Legumes Love Rhizobium: Pulses feed bacteria sugar; bacteria feed plants nitrogen!",
    "davExamTip": "Lightning also fixes nitrogen by combining N2 and O2 into nitric oxide which rains down as dilute nitric acid.",
    "quickQuiz": {
      "question": "Which bacterium lives in the root nodules of leguminous plants and fixes atmospheric nitrogen?",
      "options": [
        "Lactobacillus",
        "Rhizobium",
        "E. coli",
        "Pseudomonas"
      ],
      "correctIndex": 1,
      "explanation": "Rhizobium forms a symbiotic relationship with legume roots, converting gaseous N2 into soil nitrates."
    }
  },
  {
    "id": 66,
    "title": "Food Preservation Techniques & Pasteurisation",
    "classGrade": "Class 8",
    "subject": "Biology",
    "category": "Food Science",
    "iconName": "ShieldCheck",
    "coreDefinition": "Methods preventing food spoilage by microbial growth: chemical preservatives (Sodium benzoate), salting, sugar syruping, oil/vinegar immersion, and Pasteurisation (heating milk to 70°C for 15-30s then sudden chilling).",
    "keyFormulaOrLaw": "\\text{Pasteurisation: } 70^\\circ\\text{C for } 15\\text{--}30\\text{s} \\xrightarrow{\\text{rapid chill}} < 10^\\circ\\text{C}",
    "diagramDescription": "Temperature-time cycle chart of industrial milk pasteurisation plant.",
    "realWorldExample": "Louis Pasteur developing pasteurisation; pickles preserved indefinitely under thick mustard oil layers.",
    "mnemonicOrMemoryHook": "Pasteurise = Flash Heat, Rapid Freeze, Germs Gone!",
    "davExamTip": "Sugar and salt preserve food by osmosis: they draw water out of microbial cells, causing dehydration and death.",
    "quickQuiz": {
      "question": "Louis Pasteur invented the process of pasteurisation, which is universally applied to preserve:",
      "options": [
        "Pickles",
        "Milk",
        "Wheat grain",
        "Vegetables"
      ],
      "correctIndex": 1,
      "explanation": "Commercial packaged milk is pasteurised to kill harmful pathogens without altering nutritional flavor."
    }
  },
  {
    "id": 67,
    "title": "Crop Production: Sowing, Manures & Fertilizers",
    "classGrade": "Class 8",
    "subject": "Biology",
    "category": "Agriculture",
    "iconName": "Sprout",
    "coreDefinition": "Agricultural practices: soil preparation (ploughing, levelling), seed selection, sowing, adding nutrients, irrigation, harvesting. Manure is organic and improves soil texture; fertilizers are inorganic nutrient-rich salts.",
    "keyFormulaOrLaw": "\\text{Manure: Organic humus-builder}; \\quad \\text{Fertilizers: N-P-K (Nitrogen, Phosphorus, Potassium concentrated)}",
    "diagramDescription": "Comparison column contrasting soil with rich organic compost vs soil degraded by excess synthetic chemical salts.",
    "realWorldExample": "Drip irrigation saving 60% water in drought-prone regions; green manuring with sunn hemp.",
    "mnemonicOrMemoryHook": "N-P-K: Nitrogen for leaves, Phosphorus for roots, Potassium for fruits!",
    "davExamTip": "Excessive use of chemical fertilizers makes soil acidic or alkaline and leads to water pollution through eutrophication.",
    "quickQuiz": {
      "question": "Which of the following is an organic substance prepared by decomposition of plant and animal waste?",
      "options": [
        "Urea",
        "NPK",
        "Manure",
        "Superphosphate"
      ],
      "correctIndex": 2,
      "explanation": "Manure is natural organic fertilizer formed by decomposition of cow dung, crop residue, and kitchen waste."
    }
  },
  {
    "id": 68,
    "title": "Modern Irrigation: Drip & Sprinkler Systems",
    "classGrade": "Class 8",
    "subject": "Biology",
    "category": "Agriculture",
    "iconName": "CloudDrizzle",
    "coreDefinition": "Controlled application of water to crops. Traditional methods (moat, chain pump, dhekli, rahat) waste water. Modern methods: Sprinkler (for uneven sandy terrain) and Drip system (water falls drop-by-drop at roots with zero wastage).",
    "keyFormulaOrLaw": "\\text{Drip Irrigation: Minimal evaporation, water delivered drop-by-drop directly to rhizosphere}",
    "diagramDescription": "Layout of primary pipeline with micro-tubing dripping precisely at root bases of orchard trees.",
    "realWorldExample": "Drip irrigation systems in arid states of Rajasthan and Gujarat turning desert belts fertile.",
    "mnemonicOrMemoryHook": "Drip = Direct to Roots! Best for water scarcity regions.",
    "davExamTip": "Drip irrigation is the most water-efficient irrigation method known, with application efficiency exceeding 90%.",
    "quickQuiz": {
      "question": "Which modern irrigation method delivers water drop-by-drop right at the base of plant roots?",
      "options": [
        "Rahat system",
        "Drip irrigation",
        "Sprinkler system",
        "Chain pump"
      ],
      "correctIndex": 1,
      "explanation": "Drip irrigation delivers water directly to the plant root zone, eliminating evaporation and runoff waste."
    }
  },
  {
    "id": 69,
    "title": "Conservation of Biodiversity: Red Data Book",
    "classGrade": "Class 8",
    "subject": "Biology",
    "category": "Ecology",
    "iconName": "Book",
    "coreDefinition": "Biodiversity refers to variety of life on Earth. Deforestation causes habitat loss and global warming. Red Data Book, maintained by IUCN, keeps an international source record of endangered flora and fauna.",
    "keyFormulaOrLaw": "\\text{IUCN: International Union for Conservation of Nature}; \\quad \\text{Species Categories: Vulnerable, Endangered, Extinct}",
    "diagramDescription": "Cover of Red Data Book listing Bengal Tiger, Great Indian Bustard, and Snow Leopard.",
    "realWorldExample": "Reforestation initiatives in the Himalayan foothills; Project Tiger launched in 1973 in India.",
    "mnemonicOrMemoryHook": "Endemic species are found exclusively in one specific geographic area (e.g., Nilgiri Tahr).",
    "davExamTip": "The Red Data Book records endangered species; it is published and regularly updated by IUCN.",
    "quickQuiz": {
      "question": "Which international record book documents all endangered species of animals and plants?",
      "options": [
        "Blue Planet Registry",
        "Red Data Book",
        "Green Heritage Ledger",
        "Wildlife Census Book"
      ],
      "correctIndex": 1,
      "explanation": "The Red Data Book is maintained internationally by IUCN to catalog threatened and endangered species."
    }
  },
  {
    "id": 70,
    "title": "Protected Areas: National Parks vs Sanctuaries vs Biosphere Reserves",
    "classGrade": "Class 8",
    "subject": "Biology",
    "category": "Conservation",
    "iconName": "Trees",
    "coreDefinition": "Protected areas conserve ecosystems. Wildlife Sanctuary (protects animals from hunting/poaching). National Park (strict protection of landscape, fauna, and historic objects; no human activity allowed). Biosphere Reserve (vast multi-purpose area conserving biodiversity and tribal culture).",
    "keyFormulaOrLaw": "\\text{Biosphere Reserve Zones: Core (no human activity) } \\rightarrow \\text{ Buffer (research) } \\rightarrow \\text{ Transition (sustainable)}",
    "diagramDescription": "Concentric circular zoning of a Biosphere Reserve: strict Core Zone surrounded by Buffer and Transition areas.",
    "realWorldExample": "Kaziranga National Park protecting one-horned rhinos; Pachmarhi Biosphere Reserve in Madhya Pradesh.",
    "mnemonicOrMemoryHook": "Sanctuary protects Species; Park protects Ecosystem; Biosphere protects entire Biome & Tribal culture!",
    "davExamTip": "Jim Corbett in Uttarakhand was India's first National Park established in 1936.",
    "quickQuiz": {
      "question": "In which protected area zone is ALL human exploitation and disturbance strictly prohibited?",
      "options": [
        "Transition zone",
        "Buffer zone",
        "Core zone",
        "Peripheral zone"
      ],
      "correctIndex": 2,
      "explanation": "The Core zone of a Biosphere Reserve is legally protected from all human activity to preserve pristine wildlife."
    }
  },
  {
    "id": 71,
    "title": "Sexual Reproduction & Gametogenesis",
    "classGrade": "Class 8",
    "subject": "Biology",
    "category": "Reproduction",
    "iconName": "Heart",
    "coreDefinition": "Reproduction involving fusion of male gamete (sperm) and female gamete (ovum) to form a diploid zygote. Male system: testes produce sperm and testosterone. Female system: ovaries produce ova, estrogen, and progesterone.",
    "keyFormulaOrLaw": "\\text{Sperm (n) } + \\text{ Ovum (n) } \\xrightarrow{\\text{Fertilisation}} \\text{Zygote (2n)}",
    "diagramDescription": "Anatomy of human sperm (head with nucleus, middle piece with mitochondria, flagellum tail) and ovum.",
    "realWorldExample": "Fertilisation in fallopian tube (oviduct) initiating embryonic development.",
    "mnemonicOrMemoryHook": "Fusion of gametes = Fertilisation -> Zygote -> Embryo -> Foetus -> Baby!",
    "davExamTip": "Fertilisation in humans occurs inside the Fallopian tube (oviduct), NOT inside the uterus.",
    "quickQuiz": {
      "question": "Where does fertilisation normally take place in the human female reproductive system?",
      "options": [
        "Ovary",
        "Uterus",
        "Fallopian tube (Oviduct)",
        "Cervix"
      ],
      "correctIndex": 2,
      "explanation": "The sperm meets and fertilises the ovum in the fallopian tube (oviduct)."
    }
  },
  {
    "id": 72,
    "title": "Internal vs External Fertilisation & Metamorphosis",
    "classGrade": "Class 8",
    "subject": "Biology",
    "category": "Reproduction",
    "iconName": "GitMerge",
    "coreDefinition": "Internal fertilisation occurs inside the female body (mammals, birds, reptiles). External fertilisation occurs outside in water (frogs, fish). Metamorphosis is the drastic transformation from larva to adult (tadpole to frog).",
    "keyFormulaOrLaw": "\\text{Egg } \\rightarrow \\text{ Tadpole (Larva with gills/tail) } \\xrightarrow{\\text{Thyroxine}} \\text{ Adult Frog (Lungs/legs)}",
    "diagramDescription": "Life cycle of frog showing dramatic stages from aquatic swimming tadpole to terrestrial hopping adult.",
    "realWorldExample": "Frogs releasing hundreds of eggs in water during monsoon; hens laying hard-shelled calcified eggs.",
    "mnemonicOrMemoryHook": "Thyroid gland hormone (Thyroxine) is mandatory for tadpole metamorphosis!",
    "davExamTip": "If water lacks sufficient iodine, tadpoles cannot produce thyroxine and cannot metamorphose into frogs.",
    "quickQuiz": {
      "question": "Metamorphosis of a tadpole into an adult frog is controlled by which essential hormone?",
      "options": [
        "Insulin",
        "Thyroxine",
        "Adrenaline",
        "Growth Hormone"
      ],
      "correctIndex": 1,
      "explanation": "Thyroxine (produced by thyroid gland using iodine) triggers metamorphosis in amphibians."
    }
  },
  {
    "id": 73,
    "title": "Asexual Reproduction: Binary Fission & Budding",
    "classGrade": "Class 8",
    "subject": "Biology",
    "category": "Reproduction",
    "iconName": "Copy",
    "coreDefinition": "Reproduction without gamete fusion, producing genetically identical clones from a single parent. Binary Fission: parent divides into two equal daughter cells (Amoeba). Budding: small outgrowth detaches as new individual (Hydra, Yeast).",
    "keyFormulaOrLaw": "\\text{Binary Fission: Parent Amoeba } \\xrightarrow{\\text{Karyokinesis } + \\text{ Cytokinesis}} 2 \\text{ Daughters}",
    "diagramDescription": "Step-by-step diagram of Amoeba nucleus elongating and dividing, followed by cell constricting into two.",
    "realWorldExample": "Rapid multiplication of baker's yeast making bread dough rise; Hydra reproducing in freshwater ponds.",
    "mnemonicOrMemoryHook": "Binary = Two Halves (Amoeba); Budding = Branch Outgrowths (Hydra)!",
    "davExamTip": "Binary fission involves karyokinesis (nuclear division) followed immediately by cytokinesis (cytoplasmic division).",
    "quickQuiz": {
      "question": "Hydra commonly reproduces asexually through which method?",
      "options": [
        "Binary fission",
        "Budding",
        "Spore formation",
        "Fragmentation"
      ],
      "correctIndex": 1,
      "explanation": "Hydra produces a lateral bud via repeated cell division that grows and detaches as a new organism."
    }
  },
  {
    "id": 74,
    "title": "The Endocrine System & Master Pituitary Gland",
    "classGrade": "Class 8",
    "subject": "Biology",
    "category": "Endocrinology",
    "iconName": "Activity",
    "coreDefinition": "Ductless glands secreting chemical messengers (hormones) directly into the bloodstream. Pituitary (master gland controls other glands), Thyroid (thyroxine, metabolic rate), Pancreas (insulin regulates blood sugar), Adrenal (adrenaline, fight-or-flight).",
    "keyFormulaOrLaw": "\\text{Pituitary: TSH, GH}; \\; \\text{Thyroid: Thyroxine}; \\; \\text{Pancreas: Insulin}; \\; \\text{Adrenal: Adrenaline}",
    "diagramDescription": "Silhouette diagram of human body pinpointing brain pituitary, neck thyroid, kidney adrenals, and pancreas.",
    "realWorldExample": "Adrenaline surge increasing heart rate and breathing when facing danger or exam stress.",
    "mnemonicOrMemoryHook": "Pituitary is the Principal; Thyroid is the Thermostat; Pancreas is the Sugar Guard!",
    "davExamTip": "Goitre is caused by deficiency of iodine in the diet, leading to swelling of the thyroid gland.",
    "quickQuiz": {
      "question": "Deficiency of which hormone causes the metabolic disease Diabetes Mellitus?",
      "options": [
        "Thyroxine",
        "Adrenaline",
        "Insulin",
        "Growth Hormone"
      ],
      "correctIndex": 2,
      "explanation": "Insulin, secreted by the beta cells of the pancreas, regulates glucose uptake; deficiency causes diabetes."
    }
  },
  {
    "id": 75,
    "title": "Adolescence, Puberty & Sex Chromosomes",
    "classGrade": "Class 8",
    "subject": "Biology",
    "category": "Genetics",
    "iconName": "UserCheck",
    "coreDefinition": "Puberty marks sexual maturity triggered by sex hormones (Testosterone in boys, Estrogen in girls). Humans have 23 pairs of chromosomes. Sex is determined by male sperm carrying either X or Y chromosome (XX = girl, XY = boy).",
    "keyFormulaOrLaw": "\\text{Mother: } 22 + X; \\quad \\text{Father: } 22 + X \\text{ or } 22 + Y \\implies \\text{Father determines child's sex}",
    "diagramDescription": "Punnett square cross showing 50% probability of XX (female) and 50% probability of XY (male).",
    "realWorldExample": "Voice deepening in boys (Adam's apple development) and growth spurt during teenage years.",
    "mnemonicOrMemoryHook": "Father's sperm decides: X makes a daughter, Y makes a son!",
    "davExamTip": "It is scientifically flawed to blame the mother for the sex of a child, because only the father donates the Y chromosome.",
    "quickQuiz": {
      "question": "Who determines the sex of the unborn child genetically?",
      "options": [
        "Mother's ovum",
        "Father's sperm",
        "Diet of parents",
        "Environmental temperature"
      ],
      "correctIndex": 1,
      "explanation": "The father produces two types of sperm (50% X and 50% Y); fertilization by Y sperm creates a male child."
    }
  },
  {
    "id": 76,
    "title": "Photosynthesis & Chloroplast Function",
    "classGrade": "Class 7/8",
    "subject": "Biology",
    "category": "Botany",
    "iconName": "Sun",
    "coreDefinition": "Process by which green plants synthesize glucose from carbon dioxide and water using light energy captured by chlorophyll, releasing oxygen as a byproduct.",
    "keyFormulaOrLaw": "6CO_2 + 6H_2O \\xrightarrow[\\text{Chlorophyll}]{\\text{Sunlight}} C_6H_{12}O_6 + 6O_2\\uparrow",
    "diagramDescription": "Cross-section of a green leaf showing stomata guard cells, palisade mesophyll, and chloroplast stacks (thylakoids).",
    "realWorldExample": "Green foliage purifying Earth's atmosphere and sustaining the planetary oxygen-carbon balance.",
    "mnemonicOrMemoryHook": "Sunlight + CO2 + Water -> Glucose + Oxygen!",
    "davExamTip": "Stomata open and close via turgor changes in kidney-shaped guard cells to regulate gas exchange and transpiration.",
    "quickQuiz": {
      "question": "Which gas is released into the atmosphere as a byproduct during photosynthesis?",
      "options": [
        "Carbon dioxide",
        "Oxygen",
        "Nitrogen",
        "Methane"
      ],
      "correctIndex": 1,
      "explanation": "During the photolysis of water in photosynthesis, oxygen (O2) gas is liberated into the atmosphere."
    }
  },
  {
    "id": 77,
    "title": "Human Digestive System & Enzyme Action",
    "classGrade": "Class 7/8",
    "subject": "Biology",
    "category": "Physiology",
    "iconName": "Layers",
    "coreDefinition": "Alimentary canal breaks down complex food into absorbable nutrients. Salivary amylase (mouth, breaks starch), Pepsin/HCl (stomach, digests proteins), Bile (liver, emulsifies fats), Villi (small intestine, nutrient absorption).",
    "keyFormulaOrLaw": "\\text{Starch} \\xrightarrow{\\text{Amylase}} \\text{Maltose}; \\quad \\text{Proteins} \\xrightarrow{\\text{Pepsin/HCl}} \\text{Peptides}; \\quad \\text{Fats} \\xrightarrow{\\text{Bile}} \\text{Emulsified droplets}",
    "diagramDescription": "Diagram of digestive tract highlighting mouth, esophagus, stomach, liver, gall bladder, pancreas, and coiled intestines.",
    "realWorldExample": "Feeling hungry when stomach walls contract; taking digestive enzymes for protein digestion.",
    "mnemonicOrMemoryHook": "Mouth does Starch, Stomach does Protein, Liver does Fat, Intestine absorbs All!",
    "davExamTip": "Bile juice produced by the liver contains NO enzymes, yet is crucial for emulsifying large fat globules.",
    "quickQuiz": {
      "question": "Where is bile juice produced and where is it stored temporarily?",
      "options": [
        "Produced in Pancreas, stored in Stomach",
        "Produced in Liver, stored in Gall Bladder",
        "Produced in Small Intestine, stored in Liver",
        "Produced in Stomach, stored in Liver"
      ],
      "correctIndex": 1,
      "explanation": "Bile is secreted continuously by liver hepatocytes and stored/concentrated in the gall bladder."
    }
  },
  {
    "id": 78,
    "title": "Aerobic vs Anaerobic Respiration",
    "classGrade": "Class 7/8",
    "subject": "Biology",
    "category": "Physiology",
    "iconName": "Wind",
    "coreDefinition": "Cellular breakdown of glucose to release ATP. Aerobic uses oxygen (yields 36-38 ATP, CO2, H2O). Anaerobic occurs without oxygen (yeast produces ethanol + CO2; human muscles produce lactic acid causing muscle cramps).",
    "keyFormulaOrLaw": "\\text{Aerobic: } C_6H_{12}O_6 + 6O_2 \\rightarrow 6CO_2 + 6H_2O + 38\\text{ ATP}; \\quad \\text{Muscle Anaerobic: Glucose } \\rightarrow 2\\text{ Lactic Acid} + 2\\text{ ATP}",
    "diagramDescription": "Mitochondria biochemical pathway comparing full oxidative phosphorylation vs glycolytic fermentation.",
    "realWorldExample": "Athletes getting muscle cramps after sprinting due to accumulation of lactic acid.",
    "mnemonicOrMemoryHook": "Aerobic gives 38 ATP with Oxygen; Anaerobic gives 2 ATP + Cramps or Ethanol!",
    "davExamTip": "Hot water bath or massage relieves muscle cramps by improving blood circulation and supplying oxygen to break down lactic acid.",
    "quickQuiz": {
      "question": "The accumulation of which acid in muscles causes cramps during heavy exercise?",
      "options": [
        "Acetic acid",
        "Lactic acid",
        "Hydrochloric acid",
        "Citric acid"
      ],
      "correctIndex": 1,
      "explanation": "Anaerobic breakdown of glucose in overworked muscle cells generates lactic acid, causing painful cramps."
    }
  },
  {
    "id": 79,
    "title": "The Indian Constitution & Preamble",
    "classGrade": "Class 8",
    "subject": "Social Science",
    "category": "Civics",
    "iconName": "FileText",
    "coreDefinition": "The supreme legal document of India adopted on 26 November 1949 and enacted on 26 January 1950. The Preamble declares India a Sovereign, Socialist, Secular, Democratic Republic securing Justice, Liberty, Equality, and Fraternity.",
    "keyFormulaOrLaw": "\\text{Preamble: Sovereign, Socialist, Secular, Democratic Republic}; \\quad \\text{Dr. B.R. Ambedkar: Father of the Constitution}",
    "diagramDescription": "Calligraphy of the Preamble encircled by national symbols and Ashoka Lion capital.",
    "realWorldExample": "Republic Day parade celebrating constitutional democracy every 26th January.",
    "mnemonicOrMemoryHook": "S-S-S-D-R: Sovereign, Socialist, Secular, Democratic, Republic!",
    "davExamTip": "Dr. B.R. Ambedkar served as the Chairman of the Drafting Committee of the Constituent Assembly.",
    "quickQuiz": {
      "question": "Who was the Chairman of the Drafting Committee of the Indian Constitution?",
      "options": [
        "Mahatma Gandhi",
        "Jawaharlal Nehru",
        "Dr. B.R. Ambedkar",
        "Dr. Rajendra Prasad"
      ],
      "correctIndex": 2,
      "explanation": "Dr. Bhimrao Ramji Ambedkar chaired the Drafting Committee and is known as the Chief Architect of the Constitution."
    }
  },
  {
    "id": 80,
    "title": "The 6 Fundamental Rights of Indian Citizens",
    "classGrade": "Class 8",
    "subject": "Social Science",
    "category": "Civics",
    "iconName": "Shield",
    "coreDefinition": "Guaranteed by Part III (Articles 12-35): 1. Right to Equality. 2. Right to Freedom. 3. Right against Exploitation. 4. Right to Freedom of Religion. 5. Cultural and Educational Rights. 6. Right to Constitutional Remedies (Article 32).",
    "keyFormulaOrLaw": "\\text{Article 32: 'Heart and Soul of the Constitution' (Right to approach Supreme Court for enforcement of rights)}",
    "diagramDescription": "Wheel of 6 fundamental rights radiating from central Ashoka Chakra.",
    "realWorldExample": "Filing a court writ when someone is discriminated against on basis of caste or religion.",
    "mnemonicOrMemoryHook": "Article 32 is the Shield protecting all other 5 Fundamental Rights!",
    "davExamTip": "Dr. Ambedkar called Article 32 (Right to Constitutional Remedies) the 'very soul of the Constitution and the very heart of it'.",
    "quickQuiz": {
      "question": "Which Fundamental Right was described by Dr. Ambedkar as the 'Heart and Soul of the Constitution'?",
      "options": [
        "Right to Equality",
        "Right to Freedom of Speech",
        "Right to Constitutional Remedies (Art 32)",
        "Right to Property"
      ],
      "correctIndex": 2,
      "explanation": "Article 32 empowers citizens to move the Supreme Court directly if any of their fundamental rights are violated."
    }
  },
  {
    "id": 81,
    "title": "Secularism in the Indian Context",
    "classGrade": "Class 8",
    "subject": "Social Science",
    "category": "Civics",
    "iconName": "Globe",
    "coreDefinition": "The constitutional principle that the Indian State does not promote any one religion as the official state religion. Unlike American strict separation, Indian secularism maintains principled distance and equal respect for all faiths (Sarva Dharma Sambhava).",
    "keyFormulaOrLaw": "\\text{Article 25: Freedom of conscience and free profession, practice and propagation of religion}",
    "diagramDescription": "Interfaith emblems (Om, Crescent, Cross, Khanda, Dharma Wheel) united under national tricolour.",
    "realWorldExample": "Government schools cannot celebrate religious festivals on premises to maintain secular neutrality.",
    "mnemonicOrMemoryHook": "No State Religion = Equal Respect for All Religions!",
    "davExamTip": "Indian state intervenes when religious practices violate fundamental rights, such as banning untouchability.",
    "quickQuiz": {
      "question": "Which of the following is an essential feature of Indian secularism?",
      "options": [
        "State promotes Hinduism",
        "State has an official religion",
        "State maintains equal respect and distance from all religions",
        "Religious instruction is compulsory in government schools"
      ],
      "correctIndex": 2,
      "explanation": "Indian secularism guarantees that the state treats all religions equally without adopting an official faith."
    }
  },
  {
    "id": 82,
    "title": "The Union Parliament: Lok Sabha & Rajya Sabha",
    "classGrade": "Class 8",
    "subject": "Social Science",
    "category": "Civics",
    "iconName": "Building",
    "coreDefinition": "India's supreme legislative body comprises the President of India and two houses: Lok Sabha (House of the People, directly elected for 5 years) and Rajya Sabha (Council of States, permanent house, 1/3 members retire every 2 years).",
    "keyFormulaOrLaw": "\\text{Lok Sabha: Max 552 members, directly elected}; \\quad \\text{Rajya Sabha: Max 250 members, Vice-President is ex-officio Chairman}",
    "diagramDescription": "Floor plan of Sansad Bhavan / New Parliament with Lok Sabha (Peacock theme) and Rajya Sabha (Lotus theme).",
    "realWorldExample": "General Elections every 5 years where citizens over 18 vote using Electronic Voting Machines (EVMs).",
    "mnemonicOrMemoryHook": "Lok Sabha has the Money power; Rajya Sabha never dissolves!",
    "davExamTip": "Money Bills can ONLY be introduced in the Lok Sabha with prior recommendation of the President.",
    "quickQuiz": {
      "question": "Who acts as the ex-officio Chairman of the Rajya Sabha?",
      "options": [
        "The Prime Minister",
        "The Vice-President of India",
        "The Speaker",
        "The Chief Justice of India"
      ],
      "correctIndex": 1,
      "explanation": "Under Article 64, the Vice-President of India serves as the ex-officio Chairman of the Rajya Sabha."
    }
  },
  {
    "id": 83,
    "title": "How a Bill Becomes a Law in India",
    "classGrade": "Class 8",
    "subject": "Social Science",
    "category": "Civics",
    "iconName": "FileCheck",
    "coreDefinition": "A legislative proposal (Bill) passes through First Reading (introduction), Second Reading (clause-by-clause scrutiny and committee review), and Third Reading (voting) in both Houses. It becomes an Act when the President signs it.",
    "keyFormulaOrLaw": "\\text{Bill introduced} \\rightarrow \\text{Readings 1, 2, 3} \\rightarrow \\text{Passed by both Houses} \\xrightarrow{\\text{Presidential Assent}} \\text{Act / Law}",
    "diagramDescription": "Stepwise conveyor diagram showing Bill moving from Draft to Debate to Committee to President's desk.",
    "realWorldExample": "Passing of the Right to Education (RTE) Act 2009 guaranteeing free compulsory education for ages 6 to 14.",
    "mnemonicOrMemoryHook": "3 Readings + 2 Houses + 1 Presidential Signature = Law!",
    "davExamTip": "If the President returns an ordinary bill for reconsideration and Parliament repasses it, the President MUST give assent.",
    "quickQuiz": {
      "question": "At what stage does a legislative bill formally become an enforceable law (Act)?",
      "options": [
        "After passing Lok Sabha",
        "After committee approval",
        "Upon receiving the President's assent",
        "After Supreme Court review"
      ],
      "correctIndex": 2,
      "explanation": "A bill becomes an official Act of Parliament only after it receives the assent of the President of India."
    }
  },
  {
    "id": 84,
    "title": "The Independent Judiciary & Judicial Review",
    "classGrade": "Class 8",
    "subject": "Social Science",
    "category": "Civics",
    "iconName": "Scale",
    "coreDefinition": "India has a unified, integrated judicial system headed by the Supreme Court. The judiciary is independent of legislature and executive. It holds the power of Judicial Review to strike down laws that violate basic constitutional structure.",
    "keyFormulaOrLaw": "\\text{Hierarchy: Supreme Court (Apex) } \\rightarrow \\text{ High Courts (State) } \\rightarrow \\text{ Subordinate / District Courts}",
    "diagramDescription": "Pyramidal judicial hierarchy with Supreme Court at top, connecting subordinate courts via appeals.",
    "realWorldExample": "Supreme Court striking down arbitrary executive orders or unconstitutional statutes.",
    "mnemonicOrMemoryHook": "Single Integrated Ladder: Decisions of higher courts are binding on all lower courts!",
    "davExamTip": "Judges of Supreme Court and High Courts are removed only by a stringent parliamentary impeachment motion.",
    "quickQuiz": {
      "question": "What is the apex court in the integrated Indian judicial system?",
      "options": [
        "High Court of Delhi",
        "District Sessions Court",
        "Supreme Court of India",
        "International Court of Justice"
      ],
      "correctIndex": 2,
      "explanation": "The Supreme Court of India located in New Delhi is the highest judicial court of appeal in the country."
    }
  },
  {
    "id": 85,
    "title": "Public Interest Litigation (PIL)",
    "classGrade": "Class 8",
    "subject": "Social Science",
    "category": "Civics",
    "iconName": "Users",
    "coreDefinition": "A revolutionary judicial mechanism introduced in the early 1980s (championed by Justice P.N. Bhagwati) allowing any public-spirited individual or NGO to approach the High Court or Supreme Court on behalf of underprivileged citizens whose rights are infringed.",
    "keyFormulaOrLaw": "\\text{PIL relaxes 'Locus Standi'} \\implies \\text{Even a postcard can be treated as a writ petition by the Court}",
    "diagramDescription": "Diagram showing ordinary letter converted into formal court docket for underprivileged laborers.",
    "realWorldExample": "PILs securing midday meal schemes in government schools, environmental cleanup of river Ganga.",
    "mnemonicOrMemoryHook": "PIL breaks the barrier: You can seek justice for others who cannot afford lawyers!",
    "davExamTip": "The landmark Mid-Day Meal scheme was mandated throughout Indian schools via an SC ruling on a PIL.",
    "quickQuiz": {
      "question": "Which legal innovation allowed ordinary citizens to file cases on behalf of the poor and oppressed?",
      "options": [
        "Habeas Corpus",
        "Public Interest Litigation (PIL)",
        "Civil Defamation",
        "Arbitration"
      ],
      "correctIndex": 1,
      "explanation": "PIL relaxed traditional legal standing, allowing public interest groups to champion human rights cases."
    }
  },
  {
    "id": 86,
    "title": "The Criminal Justice System",
    "classGrade": "Class 8",
    "subject": "Social Science",
    "category": "Civics",
    "iconName": "ShieldAlert",
    "coreDefinition": "Four key pillars: 1. Police (investigates crimes, files FIR, collects evidence). 2. Public Prosecutor (represents the State in criminal trial). 3. Defence Lawyer (defends the accused). 4. Judge (conducts fair trial, hears witnesses, decides verdict).",
    "keyFormulaOrLaw": "\\text{Article 22: Rights of an arrested person (Informed of grounds, produced before magistrate within 24 hours)}",
    "diagramDescription": "Courtroom layout showing witness stand, Public Prosecutor, Defence Lawyer, and presiding Judge.",
    "realWorldExample": "Filing a First Information Report (FIR) at Khabra police station to initiate criminal investigation.",
    "mnemonicOrMemoryHook": "Police investigate, Prosecutor represents State, Judge decides guilty or innocent!",
    "davExamTip": "A confession made by an accused in police custody CANNOT be used as evidence against them in court (Article 20(3)).",
    "quickQuiz": {
      "question": "Within how many hours must an arrested person be produced before the nearest magistrate under Article 22?",
      "options": [
        "12 hours",
        "24 hours",
        "48 hours",
        "72 hours"
      ],
      "correctIndex": 1,
      "explanation": "Article 22 guarantees that every arrested person must be produced before a magistrate within 24 hours."
    }
  },
  {
    "id": 87,
    "title": "Understanding Marginalisation: Adivasis & Minorities",
    "classGrade": "Class 8",
    "subject": "Social Science",
    "category": "Civics",
    "iconName": "UserX",
    "coreDefinition": "Marginalisation is the social process where certain groups (Adivasis, Dalits, religious minorities) are pushed to the fringes of society, denied equal access to resources, education, and political power. Protected by Articles 15, 17, and Scheduled Castes & Tribes Prevention of Atrocities Act 1989.",
    "keyFormulaOrLaw": "\\text{Article 17: Abolition of Untouchability}; \\; \\text{Article 15: Prohibition of Discrimination}",
    "diagramDescription": "Pie chart depicting tribal forest land dispossession alongside literacy rate disparity curves.",
    "realWorldExample": "Forest Rights Act 2006 restoring ancestral habitat gathering rights to tribal communities.",
    "mnemonicOrMemoryHook": "Article 17 makes Untouchability an absolute punishable offence in India!",
    "davExamTip": "The term 'Adivasi' literally means 'original inhabitants' who lived in close harmony with forests.",
    "quickQuiz": {
      "question": "Which Article of the Indian Constitution legally abolishes the practice of Untouchability?",
      "options": [
        "Article 14",
        "Article 17",
        "Article 21",
        "Article 29"
      ],
      "correctIndex": 1,
      "explanation": "Article 17 formally abolishes Untouchability and forbids its practice in any form as a punishable crime."
    }
  },
  {
    "id": 88,
    "title": "The Revolt of 1857: The First War of Independence",
    "classGrade": "Class 8",
    "subject": "Social Science",
    "category": "History",
    "iconName": "Sword",
    "coreDefinition": "Mass uprising against British East India Company rule. Immediate trigger: introduction of Enfield rifle cartridges greased with cow and pig fat. Leaders: Mangal Pandey (Barrackpore), Bahadur Shah Zafar (Delhi), Rani Lakshmibai (Jhansi), Kunwar Singh (Bihar).",
    "keyFormulaOrLaw": "\\text{Causes: Political (Doctrine of Lapse), Economic (High Land Revenue), Military (Cartridges), Social}",
    "diagramDescription": "Map of 1857 uprisings connecting Meerut, Delhi, Kanpur, Lucknow, Jhansi, and Arrah (Bihar).",
    "realWorldExample": "Veer Kunwar Singh of Jagdishpur leading Bihar freedom fighters against British regiments.",
    "mnemonicOrMemoryHook": "Mangal Pandey sparked Meerut -> Delhi march crowned Bahadur Shah Zafar leader!",
    "davExamTip": "Consequence: British Crown took direct control of India via Government of India Act 1858, ending Company rule.",
    "quickQuiz": {
      "question": "Who led the armed revolt against the British in Bihar during the 1857 uprising?",
      "options": [
        "Mangal Pandey",
        "Veer Kunwar Singh",
        "Tantia Tope",
        "Nana Saheb"
      ],
      "correctIndex": 1,
      "explanation": "80-year-old Veer Kunwar Singh of Jagdishpur led the uprising courageously across Bihar."
    }
  },
  {
    "id": 89,
    "title": "Colonial Education: Macaulay vs Wood's Despatch",
    "classGrade": "Class 8",
    "subject": "Social Science",
    "category": "History",
    "iconName": "GraduationCap",
    "coreDefinition": "Lord Macaulay's Minute (1835) promoted English education and European science to create 'a class of persons Indian in blood, but English in taste'. Wood's Despatch (1854) became the 'Magna Carta of English Education in India', establishing universities.",
    "keyFormulaOrLaw": "\\text{Macaulay 1835: English Education Act}; \\quad \\text{Wood's Despatch 1854: Universities at Calcutta, Bombay, Madras}",
    "diagramDescription": "Timeline showing transition from indigenous pathshalas to British university examination boards.",
    "realWorldExample": "Establishment of higher educational institutes and universities across presidency capitals.",
    "mnemonicOrMemoryHook": "Macaulay pushed English; Wood created the University blueprint!",
    "davExamTip": "Mahatma Gandhi strongly argued that colonial English education enslaved Indians and alienated them from their roots.",
    "quickQuiz": {
      "question": "Which historical document is famously known as the 'Magna Carta of English Education in India'?",
      "options": [
        "Macaulay's Minute 1835",
        "Charter Act 1813",
        "Wood's Despatch 1854",
        "Hunter Commission 1882"
      ],
      "correctIndex": 2,
      "explanation": "Charles Wood's Despatch of 1854 outlined the comprehensive policy for university and school education in India."
    }
  },
  {
    "id": 90,
    "title": "Indian National Movement: Gandhian Era",
    "classGrade": "Class 8",
    "subject": "Social Science",
    "category": "History",
    "iconName": "Flag",
    "coreDefinition": "Mahatma Gandhi led mass movements through Satyagraha (truth-force) and Ahimsa (non-violence): Non-Cooperation Movement (1920-22, called off after Chauri Chaura), Civil Disobedience Movement (1930, Salt March to Dandi), and Quit India Movement (1942, 'Do or Die').",
    "keyFormulaOrLaw": "\\text{1920: Non-Cooperation}; \\; \\text{1930: Dandi Salt March (Civil Disobedience)}; \\; \\text{1942: Quit India ('Do or Die')}",
    "diagramDescription": "Route map of Gandhi's 240-mile Salt March from Sabarmati Ashram to the coastal village of Dandi.",
    "realWorldExample": "Khadi hand-spinning boycott movement empowering indigenous Indian weavers.",
    "mnemonicOrMemoryHook": "N-C-Q: Non-Cooperation (1920), Civil Disobedience (1930), Quit India (1942)!",
    "davExamTip": "The Non-Cooperation movement was halted in February 1922 due to the violent incident at Chauri Chaura.",
    "quickQuiz": {
      "question": "From where did Mahatma Gandhi begin his historic 240-mile Dandi Salt March in 1930?",
      "options": [
        "Wardha Ashram",
        "Sabarmati Ashram",
        "Champaran",
        "Sevagram"
      ],
      "correctIndex": 1,
      "explanation": "Gandhi marched with 78 volunteers from his Sabarmati Ashram in Ahmedabad to the coastal village of Dandi."
    }
  },
  {
    "id": 91,
    "title": "Natural Resources & Sustainable Development",
    "classGrade": "Class 8",
    "subject": "Social Science",
    "category": "Geography",
    "iconName": "Globe2",
    "coreDefinition": "Resources are substances of utility and value. Classified into Renewable (solar, wind) and Non-Renewable (coal, petroleum). Sustainable development means utilizing resources to meet present needs without compromising future generations.",
    "keyFormulaOrLaw": "\\text{Principle: Conservation of Natural Capital} \\implies \\text{Reduce, Reuse, Recycle, Replenish}",
    "diagramDescription": "Circular diagram illustrating sustainable balance between economic development, social equity, and ecological conservation.",
    "realWorldExample": "Solar rooftop installations in Muzaffarpur supplying clean renewable power.",
    "mnemonicOrMemoryHook": "Meet today's needs without stealing tomorrow's dreams!",
    "davExamTip": "Ubiquitous resources (like air) are found everywhere; localized resources (like copper ore) are found only in specific places.",
    "quickQuiz": {
      "question": "Development that meets the needs of the present without compromising future generations is called:",
      "options": [
        "Rapid industrialisation",
        "Sustainable development",
        "Capitalist expansion",
        "Exploitative development"
      ],
      "correctIndex": 1,
      "explanation": "Sustainable development harmonizes economic growth with environmental conservation for future generations."
    }
  },
  {
    "id": 92,
    "title": "Soil Horizons & Soil Conservation Techniques",
    "classGrade": "Class 8",
    "subject": "Social Science",
    "category": "Geography",
    "iconName": "Mountain",
    "coreDefinition": "Soil profile: Topsoil (O and A horizons rich in organic humus), Subsoil (B horizon with weathered rock and minerals), Substratum (C horizon), and Bedrock (R horizon). Conservation methods: Contour plowing, Terrace farming, Shelter belts, and Mulching.",
    "keyFormulaOrLaw": "\\text{Humus in Topsoil determines fertility}; \\quad \\text{Conservation: Shelterbelts in coastal/dry areas, Terracing in hills}",
    "diagramDescription": "Vertical cross-section of soil profile showing dark organic topsoil graduating into solid bedrock.",
    "realWorldExample": "Step-terrace paddy fields on steep Himalayan slopes preventing torrential water runoff.",
    "mnemonicOrMemoryHook": "Terraces for Hills; Shelterbelts for Coasts and Deserts!",
    "davExamTip": "It takes hundreds to thousands of years to form just one single centimeter of fertile topsoil.",
    "quickQuiz": {
      "question": "Which soil conservation method involves planting rows of trees to check wind speed in dry coastal areas?",
      "options": [
        "Contour bunding",
        "Terrace farming",
        "Shelterbelts",
        "Mulching"
      ],
      "correctIndex": 2,
      "explanation": "Shelterbelts are dense rows of trees planted along farm perimeters to break wind speed and prevent wind erosion."
    }
  },
  {
    "id": 93,
    "title": "Water Scarcity & Rainwater Harvesting",
    "classGrade": "Class 8",
    "subject": "Social Science",
    "category": "Geography",
    "iconName": "Droplets",
    "coreDefinition": "Water is a vital renewable natural resource covering 71% of Earth, but only 2.7% is freshwater (most locked in ice caps). Rainwater harvesting collects runoff from rooftops into underground recharge wells.",
    "keyFormulaOrLaw": "\\text{Freshwater: } 2.7\\% \\text{ total}; \\quad < 1\\% \\text{ accessible in rivers, lakes, aquifers}",
    "diagramDescription": "Rooftop catchment schematic: gutter pipes routing rain through filtration sand pit into groundwater recharge borewell.",
    "realWorldExample": "Traditional Baolis (stepwells) in Rajasthan and rooftop rainwater collection tanks in urban homes.",
    "mnemonicOrMemoryHook": "Catch the Rain where it falls, when it falls!",
    "davExamTip": "Tamil Nadu was the first Indian state to make rooftop rainwater harvesting compulsory for all houses.",
    "quickQuiz": {
      "question": "Approximately what percentage of the total water on Earth is easily accessible freshwater for human use?",
      "options": [
        "71%",
        "25%",
        "Less than 1%",
        "10%"
      ],
      "correctIndex": 2,
      "explanation": "Although 2.7% of Earth's water is freshwater, over 70% is frozen in glaciers, leaving less than 1% accessible."
    }
  },
  {
    "id": 94,
    "title": "Types of Agriculture: Subsistence vs Commercial",
    "classGrade": "Class 8",
    "subject": "Social Science",
    "category": "Geography",
    "iconName": "Wheat",
    "coreDefinition": "Subsistence farming: practiced to meet family needs using small plots and family labor. Commercial farming: crops grown on massive scales for market sale using high HYV seeds, fertilizers, and heavy machinery (Wheat belts, Cotton plantations).",
    "keyFormulaOrLaw": "\\text{Subsistence: Low tech, family consumption}; \\quad \\text{Commercial: Capital intensive, market export, monoculture}",
    "diagramDescription": "Split graphic: farmer with pair of bullocks plowing small plot vs combine harvester traversing mega commercial wheat field.",
    "realWorldExample": "Plantation agriculture in Assam producing world-renowned single-estate black tea.",
    "mnemonicOrMemoryHook": "Subsistence feeds the Family; Commercial feeds the Market!",
    "davExamTip": "Shifting cultivation (Jhumming in Northeast India) is a traditional slash-and-burn subsistence practice.",
    "quickQuiz": {
      "question": "What type of farming involves growing a single cash crop (like tea, coffee, or rubber) over a massive estate?",
      "options": [
        "Subsistence farming",
        "Plantation agriculture",
        "Shifting cultivation",
        "Nomadic herding"
      ],
      "correctIndex": 1,
      "explanation": "Plantation agriculture is commercial farming where a single cash crop is cultivated over vast land areas."
    }
  },
  {
    "id": 95,
    "title": "Major Indian Crops & Agro-Climatic Conditions",
    "classGrade": "Class 8",
    "subject": "Social Science",
    "category": "Geography",
    "iconName": "SunMedium",
    "coreDefinition": "Kharif crops: sown in June with monsoon arrival, harvested in autumn (Rice, Maize, Cotton, Jute). Rabi crops: sown in winter (October-December), harvested in spring (Wheat, Gram, Mustard, Barley).",
    "keyFormulaOrLaw": "\\text{Kharif (Monsoon): Rice, Cotton (High heat, high rain)}; \\quad \\text{Rabi (Winter): Wheat, Mustard (Cool season, bright sunshine)}",
    "diagramDescription": "India crop calendar dial showing monsoon Kharif season and winter Rabi season cycles.",
    "realWorldExample": "Wheat harvesting in Punjab-Haryana during Baisakhi; paddy transplantation in Bihar during monsoon.",
    "mnemonicOrMemoryHook": "Kharif comes with Rain (Rice); Rabi ripens in Spring (Wheat)!",
    "davExamTip": "Cotton grows best in the black regur soil of the Deccan plateau with 210 frost-free days.",
    "quickQuiz": {
      "question": "Which of the following is a major Rabi crop sown during the winter season?",
      "options": [
        "Paddy (Rice)",
        "Cotton",
        "Wheat",
        "Jute"
      ],
      "correctIndex": 2,
      "explanation": "Wheat is a classic Rabi crop requiring cool growing temperatures and warm sunshine during harvesting."
    }
  },
  {
    "id": 96,
    "title": "Industries & Factors of Industrial Location",
    "classGrade": "Class 8",
    "subject": "Social Science",
    "category": "Geography",
    "iconName": "Factory",
    "coreDefinition": "Secondary economic activity converting raw materials into high-value finished products. Key location factors: raw material proximity, cheap power supply, skilled labor, capital, market access, and transport infrastructure.",
    "keyFormulaOrLaw": "\\text{Primary: Extraction (Mining/Farming)} \\rightarrow \\text{Secondary: Manufacturing} \\rightarrow \\text{Tertiary: Services}",
    "diagramDescription": "Spider diagram pointing key location factors (Raw Material, Water, Power, Labor, Capital, Transport) to central factory.",
    "realWorldExample": "TISCO iron and steel plant established in Jamshedpur close to iron ore and coal reserves.",
    "mnemonicOrMemoryHook": "Silicon Valley (USA) and Bengaluru (India) are world-leading hubs of the Information Technology industry.",
    "davExamTip": "Jamshedpur was chosen for India's first steel plant due to proximity to Subarnarekha water and Jharia coalfields.",
    "quickQuiz": {
      "question": "Why is Bengaluru famously known as the 'Silicon Valley of India'?",
      "options": [
        "It has the largest steel factories",
        "It is the premier center of Information Technology",
        "It mines pure silicon",
        "It has the longest railway network"
      ],
      "correctIndex": 1,
      "explanation": "Bengaluru earned the nickname due to its pioneering concentration of IT, software, and tech corporations."
    }
  },
  {
    "id": 97,
    "title": "Active and Passive Voice Transformation",
    "classGrade": "Class 8",
    "subject": "English",
    "category": "Grammar",
    "iconName": "Repeat",
    "coreDefinition": "Active voice emphasizes the doer of the action (Subject + Verb + Object). Passive voice emphasizes the receiver or the action itself (Object + Be + Past Participle V3 + By + Subject). Only transitive verbs have passive forms.",
    "keyFormulaOrLaw": "\\text{Active: } S + V + O \\implies \\text{Passive: } O + \\text{be (appropriate tense)} + V_3 + \\text{by } S",
    "diagramDescription": "Subject-Object inversion diagram with verb converting to V3 participle form.",
    "realWorldExample": "Scientific lab reports: '5 ml of hydrochloric acid was added to the test tube' (Passive puts focus on the experiment).",
    "mnemonicOrMemoryHook": "Object becomes Subject, Verb wears V3 jacket, Subject takes the 'by' train!",
    "davExamTip": "Continuous tenses take 'being' in the passive: 'He is writing a letter' -> 'A letter is being written by him'.",
    "quickQuiz": {
      "question": "Change into passive voice: 'The teacher praised the boy.'",
      "options": [
        "The boy is praised by the teacher.",
        "The boy was praised by the teacher.",
        "The teacher was praised by the boy.",
        "The boy has been praised."
      ],
      "correctIndex": 1,
      "explanation": "Past simple active 'praised' converts to 'was praised by the teacher' in passive."
    }
  },
  {
    "id": 98,
    "title": "Reported (Indirect) Speech & Tense Shifts",
    "classGrade": "Class 8",
    "subject": "English",
    "category": "Grammar",
    "iconName": "MessageSquare",
    "coreDefinition": "Relaying what someone said without quoting their exact words. When the reporting verb is in the past tense (said), present tenses shift one step into the past, pronouns change according to speaker, and time/place words shift.",
    "keyFormulaOrLaw": "\\text{Direct: } \\text{He said, 'I am ill.'} \\implies \\text{Indirect: } \\text{He said that he was ill.}",
    "diagramDescription": "Timeline chart showing tense backshifting from present simple to past simple, present perfect to past perfect.",
    "realWorldExample": "Journalistic news reporting summarizing interviews and press briefings.",
    "mnemonicOrMemoryHook": "Tense goes one step back: Now becomes Then, Today becomes That day, Here becomes There!",
    "davExamTip": "Universal truths or scientific facts do NOT change tense in reported speech (e.g., 'The teacher said that the Sun rises in the east').",
    "quickQuiz": {
      "question": "Convert to indirect speech: She said, 'I will complete my homework.'",
      "options": [
        "She said that she will complete her homework.",
        "She said that she would complete her homework.",
        "She says that she would complete.",
        "She said that I would complete."
      ],
      "correctIndex": 1,
      "explanation": "In indirect speech with a past reporting verb, modal 'will' shifts to 'would'."
    }
  },
  {
    "id": 99,
    "title": "Modals & Semi-Modals in English",
    "classGrade": "Class 8",
    "subject": "English",
    "category": "Grammar",
    "iconName": "Sliders",
    "coreDefinition": "Auxiliary verbs expressing ability, possibility, permission, necessity, obligation, or advice. Can/Could (ability/polite request), May/Might (permission/possibility), Must (obligation), Should/Ought to (moral duty).",
    "keyFormulaOrLaw": "\\text{Structure: } \\text{Subject} + \\text{Modal} + V_1 \\; (\\text{bare infinitive}) \\quad \\text{[No -s or -ing on modal]}",
    "diagramDescription": "Thermometer scale of certainty: Might (20%) -> May (50%) -> Can (70%) -> Must (100%).",
    "realWorldExample": "Traffic regulations: 'Drivers must wear seatbelts' (Compulsory legal obligation).",
    "mnemonicOrMemoryHook": "Modals never take -s, -ed, or -ing, and always take the base verb V1!",
    "davExamTip": "Use 'may' for formal permission ('May I come in, sir?'); use 'can' for informal everyday ability.",
    "quickQuiz": {
      "question": "Which modal verb best expresses a compulsory legal rule or strict obligation?",
      "options": [
        "Should",
        "May",
        "Must",
        "Might"
      ],
      "correctIndex": 2,
      "explanation": "'Must' denotes unavoidable obligation, command, or vital necessity."
    }
  },
  {
    "id": 100,
    "title": "Subject-Verb Agreement (Concord Rules)",
    "classGrade": "Class 8",
    "subject": "English",
    "category": "Grammar",
    "iconName": "CheckCircle",
    "coreDefinition": "A verb must agree in number and person with its subject. Singular subject takes singular verb (-s); plural subject takes plural verb. Tricky cases: 'Neither/nor' follows the nearer subject; collective nouns usually take singular verbs.",
    "keyFormulaOrLaw": "\\text{Rule of Proximity: } \\text{Neither the teacher nor the students } \\mathbf{were} \\text{ present.}",
    "diagramDescription": "Balance scale showing singular subject balancing with 'is/has/verb-s' and plural balancing with 'are/have/verb'.",
    "realWorldExample": "Writing academic essays and professional email correspondence with error-free grammar.",
    "mnemonicOrMemoryHook": "Each, Every, Either, Neither take Singular verbs! Words like 'together with' do not change the subject number.",
    "davExamTip": "Titles of books, distances, and sums of money take singular verbs: 'The Arabian Nights is an entertaining book'.",
    "quickQuiz": {
      "question": "Fill in the blank: 'Neither of the boys _____ present in the classroom yesterday.'",
      "options": [
        "were",
        "was",
        "are",
        "have been"
      ],
      "correctIndex": 1,
      "explanation": "'Neither of' refers to one at a time and strictly takes a singular verb: 'was'."
    }
  },
  {
    "id": 101,
    "title": "Non-Finites: Infinitives, Gerunds & Participles",
    "classGrade": "Class 8",
    "subject": "English",
    "category": "Grammar",
    "iconName": "FileCode",
    "coreDefinition": "Verbs that do not show tense, person, or number. 1. Infinitive: to + V1 (e.g., 'to run'). 2. Gerund: verb + ing functioning as a noun (e.g., 'Swimming is good exercise'). 3. Participle: verb functioning as an adjective (e.g., 'the barking dog').",
    "keyFormulaOrLaw": "\\text{Infinitive: } \\text{to} + V_1; \\quad \\text{Gerund: } V\\text{-ing (Noun)}; \\quad \\text{Participle: } V\\text{-ing / } V_3 \\text{ (Adjective)}",
    "diagramDescription": "Three-branch diagram showing non-finites branching into Infinitive, Gerund, and Participle with functions.",
    "realWorldExample": "Signboards: 'Smoking is strictly prohibited' (Gerund 'smoking' as noun subject).",
    "mnemonicOrMemoryHook": "Gerund acts as a Noun; Participle acts as an Adjective; Infinitive starts with 'To'!",
    "davExamTip": "Bare infinitives omit 'to' after sensory verbs (see, hear, feel) and modal auxiliaries.",
    "quickQuiz": {
      "question": "Identify the function of 'Reading' in: 'Reading books expands your worldview.'",
      "options": [
        "Finite verb",
        "Gerund (acting as noun subject)",
        "Past participle",
        "Adverb"
      ],
      "correctIndex": 1,
      "explanation": "'Reading' is a gerund (V-ing) acting as the subject noun of the sentence."
    }
  },
  {
    "id": 102,
    "title": "Figures of Speech: Metaphor, Simile & Personification",
    "classGrade": "Class 8",
    "subject": "English",
    "category": "Literature",
    "iconName": "Feather",
    "coreDefinition": "Literary devices enriching prose and poetry. Simile: explicit comparison using 'like' or 'as'. Metaphor: direct implicit comparison without 'like' or 'as'. Personification: attributing human qualities to inanimate objects.",
    "keyFormulaOrLaw": "\\text{Simile: 'As brave as a lion'}; \\; \\text{Metaphor: 'He was a lion in the battlefield'}; \\; \\text{Personification: 'The wind whispered'}",
    "diagramDescription": "Graphic comparing two objects side-by-side with 'like/as' bridge (Simile) vs merged into single entity (Metaphor).",
    "realWorldExample": "Poetry in DAV English Reader, advertising slogans, and inspiring political oratory.",
    "mnemonicOrMemoryHook": "Simile says 'Like' or 'As'; Metaphor says 'You ARE it'!",
    "davExamTip": "Alliteration is repetition of initial consonant sounds: 'She sells seashells by the seashore'.",
    "quickQuiz": {
      "question": "Which figure of speech is used in: 'The flowers danced merrily in the golden breeze'?",
      "options": [
        "Simile",
        "Personification",
        "Hyperbole",
        "Oxymoron"
      ],
      "correctIndex": 1,
      "explanation": "Flowers are inanimate; giving them the human ability to 'dance' is personification."
    }
  },
  {
    "id": 103,
    "title": "Conditional Sentences (Types 0, 1, 2, 3)",
    "classGrade": "Class 8",
    "subject": "English",
    "category": "Grammar",
    "iconName": "HelpCircle",
    "coreDefinition": "Sentences discussing factual implications or hypothetical situations. Zero (scientific fact: If heat ice, melts). First (real possibility: If rains, will cancel). Second (unreal present: If I were you, I would study). Third (unreal past regret: If had studied, would have passed).",
    "keyFormulaOrLaw": "\\text{Type 1: If } + \\text{Present, Will } + V_1; \\quad \\text{Type 2: If } + \\text{Past, Would } + V_1; \\quad \\text{Type 3: If } + \\text{Had } V_3, \\text{Would have } V_3",
    "diagramDescription": "Tree branching into present real conditions versus past counterfactual regrets.",
    "realWorldExample": "Evaluating risk scenarios in business plans and strategic sports coaching.",
    "mnemonicOrMemoryHook": "Type 3 is pure hindsight: 'If I had known, I would have warned you!'",
    "davExamTip": "In Type 2 unreal conditionals, always use 'were' instead of 'was' with all pronouns ('If I were a bird...').",
    "quickQuiz": {
      "question": "Complete: 'If you had arrived on time, you _____ the school bus.'",
      "options": [
        "will catch",
        "would catch",
        "would have caught",
        "caught"
      ],
      "correctIndex": 2,
      "explanation": "This is a Type 3 past conditional: 'had arrived' pairs with 'would have caught'."
    }
  },
  {
    "id": 104,
    "title": "Prepositions of Time, Place & Movement",
    "classGrade": "Class 8",
    "subject": "English",
    "category": "Grammar",
    "iconName": "MapPin",
    "coreDefinition": "Words governing a noun to express relation to another element. Time: 'at' (specific time), 'on' (days/dates), 'in' (months/years/seasons). Movement: 'into' (entering with motion), 'onto' (landing on top).",
    "keyFormulaOrLaw": "\\text{At 5 PM; On Monday, 15th August; In 2026, in July; Jumped } \\mathbf{into} \\text{ the pool}",
    "diagramDescription": "Target bullseye diagram: At (precise point) -> On (surface/day) -> In (enclosed area/long period).",
    "realWorldExample": "Writing official invitations and specifying event itineraries accurately.",
    "mnemonicOrMemoryHook": "At for Clock, On for Calendar, In for Century/Month/Container!",
    "davExamTip": "'Between' is used for exactly two items; 'Among' is used for three or more items.",
    "quickQuiz": {
      "question": "Fill in the blank: 'The celebratory function will be held _____ Sunday, 15th August.'",
      "options": [
        "at",
        "in",
        "on",
        "into"
      ],
      "correctIndex": 2,
      "explanation": "'On' is strictly used before days of the week and calendar dates."
    }
  },
  {
    "id": 105,
    "title": "Relative Clauses & Pronouns",
    "classGrade": "Class 8",
    "subject": "English",
    "category": "Grammar",
    "iconName": "Link",
    "coreDefinition": "Clauses starting with relative pronouns (who, whom, whose, which, that) to provide extra information about a noun. Defining clauses (no commas, essential to identify) vs Non-defining clauses (separated by commas, extra parenthetical info).",
    "keyFormulaOrLaw": "\\text{Defining: 'The student who won the gold medal is Rishit.'}; \\; \\text{Non-defining: 'Rishit, who is Head Boy, spoke.'}",
    "diagramDescription": "Sentence diagram showing relative clause embedding inside the main clause structure.",
    "realWorldExample": "Journalistic profiles and biographies summarizing achievements compactly.",
    "mnemonicOrMemoryHook": "Who for people, Which for things, That for essential clauses!",
    "davExamTip": "'Whose' indicates possession; 'Whom' is the objective case ('The boy whom you met yesterday').",
    "quickQuiz": {
      "question": "Which relative pronoun correctly completes: 'The laptop _____ I purchased yesterday has an OLED display.'",
      "options": [
        "who",
        "whom",
        "which",
        "whose"
      ],
      "correctIndex": 2,
      "explanation": "'Which' (or 'that') is used for inanimate objects like laptops."
    }
  },
  {
    "id": 106,
    "title": "Phrasal Verbs & Idiomatic Expressions",
    "classGrade": "Class 8",
    "subject": "English",
    "category": "Vocabulary",
    "iconName": "BookOpen",
    "coreDefinition": "Idiomatic phrases combining a verb with a preposition or adverb whose meaning cannot be deduced from individual words (e.g., 'give up' = quit, 'break down' = stop working or lose emotional control, 'call off' = cancel).",
    "keyFormulaOrLaw": "\\text{Verb } + \\text{ Particle} \\implies \\text{New Idiomatic Meaning (e.g., Look after = care for)}",
    "diagramDescription": "Mindmap radiating from common verbs (Break, Give, Look, Take) to multiple phrasal verb offshoots.",
    "realWorldExample": "Fluent English conversational speaking and reading comprehension passages.",
    "mnemonicOrMemoryHook": "Context is King: Never translate phrasal verbs word-for-word!",
    "davExamTip": "Distinguish 'look for' (search), 'look into' (investigate), and 'look after' (care for).",
    "quickQuiz": {
      "question": "What is the meaning of the phrasal verb 'to call off' an event?",
      "options": [
        "To postpone it",
        "To cancel it completely",
        "To start it early",
        "To invite more people"
      ],
      "correctIndex": 1,
      "explanation": "'Call off' means to cancel an event that was previously scheduled."
    }
  },
  {
    "id": 107,
    "title": "Binary Number System & Logic Gates",
    "classGrade": "Class 8",
    "subject": "Computer Science",
    "category": "Coding & Logic",
    "iconName": "Binary",
    "coreDefinition": "Computers represent all instructions using the Base-2 binary number system (0s and 1s, representing OFF and ON electrical states). Fundamental logic gates: AND (both 1), OR (at least one 1), and NOT (inverts state).",
    "keyFormulaOrLaw": "\\text{Base 2: } (1011)_2 = 1\\times 2^3 + 0\\times 2^2 + 1\\times 2^1 + 1\\times 2^0 = 11_{10}; \\quad \\text{NOT}(0) = 1",
    "diagramDescription": "Circuit truth tables and logic gate symbols (AND gate with D-shape, OR gate with curved shield).",
    "realWorldExample": "Computer memory addressing, transistor switches in microprocessors, digital calculators.",
    "mnemonicOrMemoryHook": "AND needs Both; OR needs Either; NOT turns upside down!",
    "davExamTip": "1 Byte = 8 bits. 1 Kilobyte (KB) = 1024 bytes (2^10 bytes).",
    "quickQuiz": {
      "question": "What is the decimal equivalent of the binary number (1101)₂?",
      "options": [
        "11",
        "12",
        "13",
        "14"
      ],
      "correctIndex": 2,
      "explanation": "1*(2^3) + 1*(2^2) + 0*(2^1) + 1*(2^0) = 8 + 4 + 0 + 1 = 13."
    }
  },
  {
    "id": 108,
    "title": "Algorithms & Computational Flowcharts",
    "classGrade": "Class 8",
    "subject": "Computer Science",
    "category": "Coding & Logic",
    "iconName": "GitBranch",
    "coreDefinition": "An algorithm is a step-by-step logical sequence of instructions to solve a problem. A flowchart is its visual representation using standardized geometric symbols: Oval (Start/End), Parallelogram (Input/Output), Rectangle (Process), Diamond (Decision).",
    "keyFormulaOrLaw": "\\text{Oval (Start/Stop)} \\rightarrow \\text{Parallelogram (I/O)} \\rightarrow \\text{Rectangle (Process)} \\rightarrow \\text{Diamond (Decision)}",
    "diagramDescription": "Flowchart for finding whether an input integer is Even or Odd using modulus operation (N % 2 == 0).",
    "realWorldExample": "Software architecture design before coding, robotic assembly line automated workflows.",
    "mnemonicOrMemoryHook": "Diamond decides (Yes/No branches), Rectangle does the Math!",
    "davExamTip": "Every flowchart MUST have exactly one Start symbol and at least one Stop/End symbol.",
    "quickQuiz": {
      "question": "Which flowchart shape is universally used to represent a decision condition with True/False branches?",
      "options": [
        "Rectangle",
        "Parallelogram",
        "Diamond / Rhombus",
        "Circle"
      ],
      "correctIndex": 2,
      "explanation": "A diamond shape represents decision making and branching (e.g., If condition)."
    }
  },
  {
    "id": 109,
    "title": "Sandhi aur Varn-Vichhed (Hindi & Sanskrit)",
    "classGrade": "Class 8",
    "subject": "Hindi & Sanskrit",
    "category": "Vyakaran",
    "iconName": "BookOpen",
    "coreDefinition": "दो वर्णों के परस्पर मेल से होने वाले विकार (परिवर्तन) को सन्धि कहते हैं। तीन मुख्य भेद: 1. स्वर सन्धि (दीर्घ, गुण, वृद्धि, यण, अयादि)। 2. व्यंजन सन्धि। 3. विसर्ग सन्धि। वर्ण-विच्छेद में शब्दों को मूल ध्वनियों में पृथक किया जाता है।",
    "keyFormulaOrLaw": "\\text{दीर्घ सन्धि: } अ + अ = आ, \\; इ + इ = ई; \\quad \\text{विद्या} + \\text{आलय} = \\text{विद्यालय}; \\quad \\text{सूर्य} + \\text{उदय} = \\text{सूर्योदय}",
    "diagramDescription": "स्वर सन्धि के पाँच भेदों का वृक्ष-चित्र (दीर्घ, गुण, वृद्धि, यण, अयादि)।",
    "realWorldExample": "शुद्ध हिन्दी और संस्कृत उच्चारण तथा वर्तनी की अशुद्धियों का निवारण।",
    "mnemonicOrMemoryHook": "समान स्वर मिले तो दीर्घ; अ/आ के बाद इ/ई आए तो 'ए', उ/ऊ आए तो 'ओ' (गुण)!",
    "davExamTip": "यण सन्धि में इ/ई का 'य्', उ/ऊ का 'व्', तथा ऋ का 'र्' बन जाता है (उदा. प्रति + एक = प्रत्येक)।",
    "quickQuiz": {
      "question": "'सूर्योदय' शब्द में कौन-सी सन्धि है?",
      "options": [
        "दीर्घ सन्धि",
        "गुण सन्धि",
        "वृद्धि सन्धि",
        "यण सन्धि"
      ],
      "correctIndex": 1,
      "explanation": "सूर्य + उदय = सूर्योदय (अ + उ = ओ), यह गुण स्वर सन्धि का उदाहरण है।"
    }
  },
  {
    "id": 110,
    "title": "Samas aur Samas-Vigrah (Hindi & Sanskrit)",
    "classGrade": "Class 8",
    "subject": "Hindi & Sanskrit",
    "category": "Vyakaran",
    "iconName": "Layers",
    "coreDefinition": "दो या दो से अधिक शब्दों के मेल से नए सार्थक शब्द बनाने की प्रक्रिया को समास कहते हैं। मुख्य भेद: 1. तत्पुरुष (उत्तरपद प्रधान)। 2. कर्मधारय (विशेषण-विशेष्य)। 3. द्विगु (पहला पद संख्यावाचक)। 4. द्वन्द्व (दोनों पद समान)। 5. बहुव्रीहि (तीसरा अन्य पद प्रधान)।",
    "keyFormulaOrLaw": "\\text{द्विगु: } \\text{नवग्रह (नौ ग्रहों का समूह)}; \\quad \\text{द्वन्द्व: } \\text{माता-पिता}; \\quad \\text{बहुव्रीहि: } \\text{दशानन (दश हैं आनन जिसके - रावण)}",
    "diagramDescription": "छहों समासों की पहचान और उनके प्रधान पदों का तुलनात्मक चक्र।",
    "realWorldExample": "साहित्यिक रचनाओं में संक्षेप में प्रभावोत्पादक भाषा का प्रयोग।",
    "mnemonicOrMemoryHook": "संख्या दिखे तो द्विगु, 'और' का लोप हो तो द्वन्द्व, तीसरा अर्थ निकले तो बहुव्रीहि!",
    "davExamTip": "दशानन में दस सिर दिखते हैं, परन्तु अर्थ रावण है, इसलिए यह द्विगु न होकर बहुव्रीहि समास है।",
    "quickQuiz": {
      "question": "'त्रिलोकी' (तीन लोकों का समाहार) शब्द में कौन-सा समास है?",
      "options": [
        "द्वन्द्व समास",
        "द्विगु समास",
        "कर्मधारय समास",
        "तत्पुरुष समास"
      ],
      "correctIndex": 1,
      "explanation": "जिस समास का पहला पद संख्यावाचक विशेषण हो और वह समूह का बोध कराए, वह 'द्विगु समास' होता है।"
    }
  }
];

export const CONCEPT_SUBJECT_FILTERS = [
  { id: 'all', label: 'All 110 Concepts', count: 110, icon: 'Sparkles' },
  { id: 'Mathematics', label: 'Mathematics', count: 24, icon: 'Divide' },
  { id: 'Physics', label: 'Physics', count: 18, icon: 'Zap' },
  { id: 'Chemistry', label: 'Chemistry', count: 18, icon: 'FlaskConical' },
  { id: 'Biology', label: 'Biology', count: 18, icon: 'Sprout' },
  { id: 'Social Science', label: 'Social Science', count: 18, icon: 'Globe' },
  { id: 'English', label: 'English Grammar', count: 10, icon: 'BookOpen' },
  { id: 'Computer Science', label: 'Computer Science', count: 2, icon: 'Cpu' },
  { id: 'Hindi & Sanskrit', label: 'Hindi & Sanskrit', count: 2, icon: 'Languages' },
];

export const CONCEPT_GRADE_FILTERS = [
  { id: 'all', label: 'All Classes' },
  { id: 'Class 8', label: 'Class 8 Focus' },
  { id: 'Class 7', label: 'Class 7' },
  { id: 'Class 6', label: 'Class 6' },
  { id: 'Foundation', label: 'Olympiad Foundation' }
];
