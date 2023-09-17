import { ClientEvents } from 'discord.js';

export interface IEvent {
	name: keyof ClientEvents;
	once?: true;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	execute: (...args: any) => void;
}

export type TEvents = Record<string, IEvent>;
