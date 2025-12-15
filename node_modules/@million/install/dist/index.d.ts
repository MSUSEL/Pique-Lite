#!/usr/bin/env node
interface TelemetryStoreType {
    NAME: string;
    CWD: string;
    CLI_COMMAND: string;
    IDE_NAME: string | null;
    IDE_VERSION: string | null;
    MILLION_VERSION: string | null;
    INSTALL_VERSION: string | null;
    PACKAGE_MANAGER: string;
    BUILD_TOOL: string | null;
    INIT_CRACO: boolean;
}
declare const TelemetryStore: TelemetryStoreType;
declare function install(name: string, version?: string | undefined): Promise<void>;

export { TelemetryStore, install };
