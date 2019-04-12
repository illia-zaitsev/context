import React from 'react';

export class ServiceLocator {

    private _services:Map<string, Object> = new Map();

    register(name:string, instance:Object):void {
        if (!this._services.has(name)) {
            this._services.set(name, instance);
        } else {
            console.warn(`Service ${name} has been registered already`)
        }
    }

    resolve(name:string) {
        if (this._services.has(name)) {
            return this._services.get(name);
        } else {
            throw new Error(`Service ${name} hasn't been registered`);
        }
    }
}

export const ServiceLocatorContext:React.Context<any> = React.createContext(null);
