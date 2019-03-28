exports.fileTree    = [
    {'name': 'builders', 'children': []},
    {'name': 'instruments', 'children': [{'name': 'Piano', 'path': '/Piano', 'fullPath': 'instruments/Piano'}]},
    {
        'name':     'models',
        'children': [
            {'name': 'Chord', 'path': '/Chord', 'fullPath': 'models/Chord'},
            {'name': 'Note', 'path': '/Note', 'fullPath': 'models/Note'},
            {'name': 'Pitch', 'path': '/Pitch', 'fullPath': 'models/Pitch'},
            {'name': 'PitchClass', 'path': '/PitchClass', 'fullPath': 'models/PitchClass'},
            {'name': 'PlayableNote', 'path': '/PlayableNote', 'fullPath': 'models/PlayableNote'},
            {'name': 'Scale', 'path': '/Scale', 'fullPath': 'models/Scale'},
        ],
    },
    {'name': 'notation', 'children': [{'name': 'Measure', 'path': '/Measure', 'fullPath': 'notation/Measure'}]},
    {
        'name':     'resources',
        'children': [
            {
                'name':     'MusicTheoryStructures',
                'path':     '/MusicTheoryStructures',
                'fullPath': 'resources/MusicTheoryStructures',
            },
        ],
    },
    {
        'name':     'utilities',
        'children': [
            {'name': 'Addons', 'path': '/Addons', 'fullPath': 'utilities/Addons'},
            {'name': 'AudioManager', 'path': '/AudioManager', 'fullPath': 'utilities/AudioManager'},
            {'name': 'MusicalAddons', 'path': '/MusicalAddons', 'fullPath': 'utilities/MusicalAddons'},
            {'name': 'Paginator', 'path': '/Paginator', 'fullPath': 'utilities/Paginator'},
            {'name': 'ScientificFuncs', 'path': '/ScientificFuncs', 'fullPath': 'utilities/ScientificFuncs'},
        ],
    },
    {
        'name':     'validation',
        'children': [
            {'name': 'PianoOctaveRule', 'path': '/PianoOctaveRule', 'fullPath': 'validation/PianoOctaveRule'},
            {'name': 'PitchClassRule', 'path': '/PitchClassRule', 'fullPath': 'validation/PitchClassRule'},
        ],
    },
]
exports.sidebarTree = (title = 'Mainpage') => ({
    '/code/': [
        {
            'title':       'API',
            'collapsable': false,
            'children':    [['', '' + title + '']],
        },
        {
            'title':       'instruments',
            'collapsable': false,
            'children':    ['instruments/Piano'],
        },
        {
            'title':       'models',
            'collapsable': false,
            'children':    [
                'models/Chord',
                'models/Note',
                'models/Pitch',
                'models/PitchClass',
                'models/PlayableNote',
                'models/Scale',
            ],
        },
        {
            'title':       'notation',
            'collapsable': false,
            'children':    ['notation/Measure'],
        },
        {
            'title':       'resources',
            'collapsable': false,
            'children':    ['resources/MusicTheoryStructures'],
        },
        {
            'title':       'utilities',
            'collapsable': false,
            'children':    [
                'utilities/Addons',
                'utilities/AudioManager',
                'utilities/MusicalAddons',
                'utilities/Paginator',
                'utilities/ScientificFuncs',
            ],
        },
        {
            'title':       'validation',
            'collapsable': false,
            'children':    [
                'validation/PianoOctaveRule',
                'validation/PitchClassRule',
            ],
        },
    ],
})
