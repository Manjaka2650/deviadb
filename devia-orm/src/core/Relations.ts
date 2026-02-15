import { Model } from "./Model";

// src/core/Relations.ts
export type RelationType = "hasMany" | "belongsTo" | "hasOne";

export interface Relation {
  type: RelationType;
  model: typeof Model;
  foreignKey: string;
  as?: string;
}

// Décorateur HasMany
export function HasMany(
  model: () => typeof Model,
  foreignKey: string,
  as?: string,
) {
  return function (target: any, propertyKey: string) {
    if (!target.constructor.relations) {
      target.constructor.relations = new Map();
    }
    target.constructor.relations.set(propertyKey, {
      type: "hasMany",
      model: model(),
      foreignKey,
      as: as || propertyKey,
    });
  };
}

// Décorateur BelongsTo
export function BelongsTo(
  model: () => typeof Model,
  foreignKey: string,
  as?: string,
) {
  return function (target: any, propertyKey: string) {
    if (!target.constructor.relations) {
      target.constructor.relations = new Map();
    }
    target.constructor.relations.set(propertyKey, {
      type: "belongsTo",
      model: model(),
      foreignKey,
      as: as || propertyKey,
    });
  };
}
