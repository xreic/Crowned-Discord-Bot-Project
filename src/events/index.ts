import * as guildCreate from './guildCreate';
import * as interactionCreate from './interactionCreate';
import * as ready from './ready';
import { TEvents } from './types';

export const events: TEvents = {
	ready,
	interactionCreate,
	guildCreate,
};