# Rollback / Recovery
Application rollback: deploy previous release if schema remains backward-compatible. For destructive future migrations use Expand -> Migrate -> Switch -> Contract. Database recovery requires PostgreSQL backup + tested restore; successful backup alone is not recovery evidence. Production GO is blocked until actual RPO/RTO and restore validation are agreed.
