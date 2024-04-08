/// <reference types="node" />
import { EventEmitter } from 'events';
import { Readable } from 'stream';
import { Options } from './speedometer';
declare namespace StreamSpeed {
    interface Options {
        timeUnit?: number;
        range?: number;
    }
    interface ToHumanOptions {
        timeUnit?: string;
        precision?: number;
    }
}
declare class StreamSpeed extends EventEmitter {
    options: Options;
    private _streams;
    /**
     * Emits speed for a group of streams.
     *
     * @constructor
     * @extends {EventEmitter}
     * @param {Object?} options
     * @param {number?} options.timeUnit The time unit speed will be measured in.
     * @param {number?} options.range Time in ms to calculate speed over.
     */
    constructor(options?: {});
    /**
     * Updates the group with the latest change in speed.
     *
     * @param {Readable} origstream
     * @param {number} speed
     */
    _update(origstream: Readable, speed: number): void;
    /**
     * Convenient method that returns list of streams in this group.
     *
     * @return {Array.<Readable>}
     */
    getStreams(): Readable[];
    /**
     * Add stream to group.
     *
     * @param {Readable} stream
     */
    add(origstream: Readable): void;
    /**
     * Remove stream from group.
     *
     * @param {Readable} stream
     */
    remove(stream: Readable): void;
    /**
     * Get current speed across all streams.
     */
    getSpeed(): number;
    /**
     * Get an individual stream's speed.
     *
     * @param {Readable} stream
     */
    getStreamSpeed(stream: Readable): number;
    /**
     * Converts bytes to human readable unit.
     * Thank you Amir from StackOverflow.
     *
     * @param {number} bytes
     * @param {Object} options
     * @param {string} options.timeUnit
     * @param {number?} options.precision
     * @return {string}
     */
    static toHuman(bytes: number, options?: StreamSpeed.ToHumanOptions): string;
}
export = StreamSpeed;
