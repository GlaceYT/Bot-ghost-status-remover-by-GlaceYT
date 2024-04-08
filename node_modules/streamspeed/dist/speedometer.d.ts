/// <reference types="node" />
export interface Options {
    timeUnit?: number;
    range?: number;
}
export declare class Speedometer {
    options: Options;
    private history;
    private _lastSpeed;
    /**
     * Helps count the number of bytes per data event in streams.
     *
     * @constructor
     * @param {Object?} options
     * @param {number?} options.timeUnit
     * @param {number?} options.range
     */
    constructor(options: Options);
    /**
     * Called when new data arrives.
     *
     * @param {Buffer|string} data
     * @param {Function} callback
     */
    update(data: Buffer, callback: (speed: number) => void): void;
    /**
     * Gets current speed.
     */
    getSpeed(): number;
}
