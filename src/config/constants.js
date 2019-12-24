// @flow

// TODO we need to move everything that we want to keep to live-common

const intFromEnv = (key: string, def: number): number => {
  const v = process.env[key];
  if (!isNaN(v)) return parseInt(v, 10);
  return def;
};

const floatFromEnv = (key: string, def: number): number => {
  const v = process.env[key];
  if (!isNaN(v)) return parseFloat(v);
  return def;
};

const boolFromEnv = (key: string, def: boolean = false): boolean => {
  const v = process.env[key];
  if (typeof v === "string") return !(v === "0" || v === "false");
  return def;
};

const stringFromEnv = (key: string, def: string): string => process.env[key] || def;

// Size

export const DEFAULT_WINDOW_WIDTH = intFromEnv("LEDGER_DEFAULT_WINDOW_WIDTH", 1024);
export const DEFAULT_WINDOW_HEIGHT = intFromEnv("LEDGER_DEFAULT_WINDOW_HEIGHT", 768);
export const MIN_WIDTH = intFromEnv("LEDGER_MIN_WIDTH", 1024);
export const MIN_HEIGHT = intFromEnv("LEDGER_MIN_HEIGHT", 700);
export const MAIN_SIDEBAR_WIDTH = 230;

// time and delays...

export const CHECK_APP_INTERVAL_WHEN_INVALID = 600;
export const CHECK_APP_INTERVAL_WHEN_VALID = 1200;
export const CHECK_UPDATE_DELAY = 5000;
export const CHECK_CUR_STATUS_INTERVAL = intFromEnv("CHECK_CUR_STATUS_INTERVAL", 60 * 60 * 1000);
export const DEVICE_INFOS_TIMEOUT = intFromEnv("DEVICE_INFOS_TIMEOUT", 5 * 1000);
export const GENUINE_CACHE_DELAY = intFromEnv("GENUINE_CACHE_DELAY", 1000);
export const GENUINE_TIMEOUT = intFromEnv("GENUINE_TIMEOUT", 120 * 1000);
export const GET_CALLS_RETRY = intFromEnv("GET_CALLS_RETRY", 2);
export const GET_CALLS_TIMEOUT = intFromEnv("GET_CALLS_TIMEOUT", 30 * 1000);
export const LISTEN_DEVICES_DEBOUNCE = intFromEnv("LISTEN_DEVICES_DEBOUNCE", 200);
// NB: technically speaking OUTDATED_CONSIDERED_DELAY should be set to ZERO.
// but we'll only do that when we're sure the sync is performant and all is working smoothly
export const OUTDATED_CONSIDERED_DELAY = intFromEnv("OUTDATED_CONSIDERED_DELAY", 2 * 60 * 1000);
export const SYNC_ALL_INTERVAL = 120 * 1000;
export const SYNC_BOOT_DELAY = 2 * 1000;
export const SYNC_PENDING_INTERVAL = 10 * 1000;
export const SYNC_MAX_CONCURRENT = intFromEnv("LEDGER_SYNC_MAX_CONCURRENT", 4);

export const DEBUG_TICK_REDUX = intFromEnv("DEBUG_TICK_REDUX", 0);

// Endpoints...

export const LEDGER_COUNTERVALUES_API = stringFromEnv(
  "LEDGER_COUNTERVALUES_API",
  "https://countervalues.api.live.ledger.com",
);
export const LEDGER_REST_API_BASE = stringFromEnv(
  "LEDGER_REST_API_BASE",
  "https://explorers.api.live.ledger.com",
);

// Provider
export const FORCE_PROVIDER = intFromEnv("FORCE_PROVIDER", 0);

// Flags

export const DISABLE_TICKER_ANIMATION = boolFromEnv("DISABLE_TICKER_ANIMATION");
export const DISABLE_CONTEXT_MENU = boolFromEnv("DISABLE_CONTEXT_MENU");
export const DEBUG_ANALYTICS = boolFromEnv("DEBUG_ANALYTICS");
export const DEBUG_DEVICE = boolFromEnv("DEBUG_DEVICE");
export const DEBUG_NETWORK = boolFromEnv("DEBUG_NETWORK");
export const DEBUG_COMMANDS = boolFromEnv("DEBUG_COMMANDS");
export const DEBUG_DB = boolFromEnv("DEBUG_DB");
export const DEBUG_ACTION = boolFromEnv("DEBUG_ACTION");
export const DEBUG_TAB_KEY = boolFromEnv("DEBUG_TAB_KEY");
export const DEBUG_LIBCORE = boolFromEnv("DEBUG_LIBCORE");
export const DEBUG_WS = boolFromEnv("DEBUG_WS");
export const DEBUG_SYNC = boolFromEnv("DEBUG_SYNC");
export const SKIP_GENUINE = boolFromEnv("SKIP_GENUINE");
export const SKIP_ONBOARDING = boolFromEnv("SKIP_ONBOARDING");
export const SHOW_LEGACY_NEW_ACCOUNT = boolFromEnv("SHOW_LEGACY_NEW_ACCOUNT");
export const SHOW_MOCK_HSMWARNINGS = boolFromEnv("SHOW_MOCK_HSMWARNINGS");
export const WARN_LEGACY_COLORS = boolFromEnv("WARN_LEGACY_COLORS");
export const HIGHLIGHT_I18N = boolFromEnv("HIGHLIGHT_I18N");
export const DISABLE_ACTIVITY_INDICATORS = boolFromEnv("DISABLE_ACTIVITY_INDICATORS");
export const EXPERIMENTAL_WS_EXPORT = boolFromEnv("EXPERIMENTAL_WS_EXPORT");
export const EXPERIMENTAL_CENTER_MODAL = boolFromEnv("EXPERIMENTAL_CENTER_MODAL");
export const EXPERIMENTAL_FIRMWARE_UPDATE = boolFromEnv("EXPERIMENTAL_FIRMWARE_UPDATE");
export const EXPERIMENTAL_HTTP_ON_RENDERER = boolFromEnv("EXPERIMENTAL_HTTP_ON_RENDERER");
export const EXPERIMENTAL_MARKET_INDICATOR_SETTINGS = boolFromEnv(
  "EXPERIMENTAL_MARKET_INDICATOR_SETTINGS",
);

// Auto update

export const UPDATE_CHECK_IGNORE = boolFromEnv("UPDATE_CHECK_IGNORE", false);
export const UPDATE_CHECK_FEED = stringFromEnv(
  "UPDATE_CHECK_FEED",
  "http://resources.live.ledger.app/public_resources/signatures",
);

// Other constants

export const MAX_ACCOUNT_NAME_SIZE = 50;

export const MOCK_DATA_SEED = floatFromEnv("MOCK_DATA_SEED", Math.random());
