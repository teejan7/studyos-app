import type { SubjectTopics } from '../types';

export const DEFAULT_TOPICS: SubjectTopics[] = [
  {
    subjectCode: 'CST302',
    modules: {
      'Module 1': [
        'Token, lexeme, pattern - definitions and examples',
        'Phases of a compiler with diagram and explanation',
        'Compiler construction tools',
        'Bootstrapping and cross compiler concept',
        'Role and functions of lexical analyzer',
        'Regular definitions and finite automata basics'
      ],
      'Module 2': [
        'FIRST and FOLLOW sets - rules and problems',
        'Leftmost and rightmost derivations (LMD & RMD)',
        'Role of syntax analyzer in compilation',
        'Elimination of left recursion with algorithm',
        'Ambiguity in grammar and methods to remove it'
      ],
      'Module 3': [
        'Predictive parsing and parsing table construction',
        'LL(1) grammar conditions and examples',
        'Shift reduce parsing with stack operations',
        'Operator precedence parsing algorithm',
        'CLR, SLR, LALR parsing comparison'
      ],
      'Module 4': [
        'Syntax Directed Definitions (SDD) concepts',
        'S-attributed and L-attributed definitions',
        'Inherited and synthesized attributes',
        'Syntax Directed Translation (SDT)',
        'Intermediate code generation techniques',
        'DAG and three-address code representation'
      ],
      'Module 5': [
        'Code optimization techniques and goals',
        'Basic block and flow graph construction',
        'Sources of optimization in compiler',
        'Design issues in code generation'
      ]
    }
  },
  {
    subjectCode: 'CST304',
    modules: {
      'Module 1': [
        'CRT display working principle',
        'DDA line drawing algorithm with example',
        'Bresenham line drawing algorithm derivation',
        'Midpoint circle drawing algorithm',
        'Shadow masking technique',
        'Raster scan vs random scan systems',
        'Frame buffer concept'
      ],
      'Module 2': [
        'Flood fill and boundary fill algorithms',
        'Scanline polygon fill algorithm',
        '2D transformations (translation, rotation, scaling)',
        'Rotation about arbitrary point'
      ],
      'Module 3': [
        'Window to viewport transformation',
        'Line clipping (Cohen-Sutherland algorithm)',
        'Projection concepts (parallel & perspective)',
        'Vanishing point concept',
        'Depth buffer algorithm',
        'Scanline algorithm'
      ],
      'Module 4': [
        'Fundamental steps in image processing',
        'Sampling and quantization',
        'Spatial and gray level resolution',
        'Neighbourhood, adjacency and connectivity',
        '4-adjacency, 8-adjacency and m-adjacency'
      ],
      'Module 5': [
        'Contrast stretching technique',
        'Histogram equalization with example',
        'Filters (mean, median, min, max)',
        'Edge detection (Sobel and Prewitt)',
        'Thresholding methods',
        'Region growing, splitting and merging',
        'Image segmentation and enhancement'
      ]
    }
  },
  {
    subjectCode: 'CST306',
    modules: {
      'Module 1': [
        'Recurrence relations - substitution, recursion tree, master method',
        'Asymptotic notations (Big-O, Theta, Omega)',
        'Best, worst and average case analysis',
        'Time and space complexity concepts',
        'General algorithm analysis techniques'
      ],
      'Module 2': [
        'AVL tree rotations and balancing',
        'Breadth First Search (BFS) with example',
        'Depth First Search (DFS) with example',
        'Strongly connected components',
        'Topological sorting algorithm'
      ],
      'Module 3': [
        'Divide and conquer strategy',
        'Strassen matrix multiplication',
        'Merge sort algorithm and complexity',
        'Greedy method and applications',
        'Fractional knapsack problem',
        'Minimum spanning tree (Kruskal)',
        'Single source shortest path (Dijkstra)'
      ],
      'Module 4': [
        'Dynamic programming concept',
        'Matrix chain multiplication',
        'Floyd Warshall algorithm',
        'Backtracking (N-Queens problem)',
        'Travelling salesman problem overview'
      ],
      'Module 5': [
        'Randomized quick sort',
        'Class P, NP and NP-complete',
        'Approximation algorithms'
      ]
    }
  },
  {
    subjectCode: 'CST372',
    modules: {
      'Module 1': [
        'Modes of transmission (simplex, half duplex, full duplex)',
        'Transmission impairments (noise, distortion, attenuation)',
        'Shannon capacity theorem and problems',
        'Nyquist theorem and signal levels',
        'Bandwidth definition and calculation'
      ],
      'Module 2': [
        'Optical fiber structure and transmission characteristics',
        'Modes of propagation (single mode, multimode)',
        'Guided media (twisted pair, coaxial, fiber)',
        'Unguided media (radio, satellite)',
        'Wireless propagation (ground, sky, line-of-sight)',
        'Antenna gain and effective area'
      ],
      'Module 3': [
        'PCM and Delta modulation',
        'Sampling theorem',
        'Digital encoding (NRZ, Manchester, AMI)',
        'ASK, FSK, PSK modulation',
        'Biphase encoding techniques'
      ],
      'Module 4': [
        'Time Division Multiplexing (TDM)',
        'Spread spectrum techniques',
        'FHSS and DSSS',
        'FDM and WDM',
        'CDMA concept'
      ],
      'Module 5': [
        'CRC and Hamming distance',
        'Error detection and correction',
        'Packet switching (datagram vs virtual circuit)',
        'Circuit switching phases',
        'Structure of packet switch',
        'Public telephone network'
      ]
    }
  },
  {
    subjectCode: 'HUT300',
    modules: {
      'Module 1': [
        'Production possibility curve and applications',
        'Law of diminishing marginal utility',
        'Demand and supply concepts',
        'Consumer and producer surplus',
        'Taxation and deadweight loss'
      ],
      'Module 2': [
        'Law of variable proportion',
        'Economies of scale (internal & external)',
        'Isoquant and iso-cost curves',
        'Producer equilibrium',
        'Break-even analysis'
      ],
      'Module 3': [
        'Market structures (perfect, monopoly, oligopoly)',
        'Non-price competition',
        'Product pricing strategies',
        'Kinked demand curve'
      ],
      'Module 4': [
        'Circular flow of income models',
        'National income methods',
        'Uses and limitations of national income',
        'Inflation causes and effects',
        'Measures to control inflation',
        'Stock vs flow',
        'Capital market vs money market'
      ],
      'Module 5': [
        'International trade advantages and disadvantages',
        'Balance of payments components',
        'Free trade vs protection',
        'Tariff and non-tariff barriers'
      ]
    }
  },
  {
    subjectCode: 'CST308',
    modules: {}
  }
];
