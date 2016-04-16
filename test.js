/**
 * @author Titus Wormer
 * @copyright 2016 Titus Wormer
 * @license MIT
 * @module unist:util:stringify-position
 * @fileoverview Test suite for `unist-util-stringify-position`.
 */

'use strict';

/* eslint-env node */

/*
 * Dependencies.
 */

var test = require('tape');
var stringify = require('./index.js');

/*
 * Tests.
 */

test('stringifyPosition', function (t) {
    t.equal(stringify(), null, 'should return `null` with `undefined`');
    t.equal(stringify(null), null, 'should return `null` with `null`');
    t.equal(stringify('foo'), null, 'should return `null` with `string`');
    t.equal(stringify(5), null, 'should return `null` with `number`');
    t.equal(stringify({}), null, 'should return `null` with `{}`');

    t.equal(
        stringify({
            'type': 'text'
        }),
        '1:1-1:1',
        'should return a range for a `node` without `position`'
    );

    t.equal(
        stringify({
            'type': 'text',
            'position': 3
        }),
        '1:1-1:1',
        'should return range for `node` with invalid `position` #1'
    );

    t.equal(
        stringify({
            'type': 'text',
            'position': {
                'start': {},
                'end': {}
            }
        }),
        '1:1-1:1',
        'should return range for `node` with invalid `position` #2'
    );

    t.equal(
        stringify({
            'type': 'text',
            'position': {
                'start': {
                    'line': null,
                    'column': null
                },
                'end': {
                    'line': null,
                    'column': null
                }
            }
        }),
        '1:1-1:1',
        'should return range for `node` with invalid `position` #3'
    );

    t.equal(
        stringify({
            'type': 'text',
            'position': {
                'start': {
                    'line': 2,
                    'column': 5
                },
                'end': {
                    'line': 2,
                    'column': 6
                }
            }
        }),
        '2:5-2:6',
        'should return range for `node` with valid `position`'
    );

    t.equal(
        stringify({
            'start': null,
            'end': null
        }),
        '1:1-1:1',
        'should return a range for a `location` without `position`s'
    );

    t.equal(
        stringify({
            'start': 3,
            'end': 6
        }),
        '1:1-1:1',
        'should return range for `location` with invalid `position`s #1'
    );

    t.equal(
        stringify({
            'start': {},
            'end': {}
        }),
        '1:1-1:1',
        'should return range for `location` with invalid `position`s #1'
    );

    t.equal(
        stringify({
            'start': {
                'line': null,
                'column': null
            },
            'end': {
                'line': null,
                'column': null
            }
        }),
        '1:1-1:1',
        'should return range for `location` with invalid `position`s #3'
    );

    t.equal(
        stringify({
            'start': {
                'line': 2,
                'column': 5
            },
            'end': {
                'line': 2,
                'column': 6
            }
        }),
        '2:5-2:6',
        'should return range for `location` with valid `position`s'
    );

    t.equal(
        stringify({
            'line': null,
            'column': null
        }),
        '1:1',
        'should return a point for a `position` without indices'
    );

    t.equal(
        stringify({
            'line': 'foo',
            'column': 'bar'
        }),
        '1:1',
        'should return a point for a `position` with invalid indices #1'
    );

    t.equal(
        stringify({
            'line': 4
        }),
        '4:1',
        'should return a point for a partially valid `position` #1'
    );

    t.equal(
        stringify({
            'column': 12
        }),
        '1:12',
        'should return a point for a partially valid `position` #1'
    );

    t.equal(
        stringify({
            'line': 5,
            'column': 2
        }),
        '5:2',
        'should return a point for a valid `position`'
    );

    t.end();
});