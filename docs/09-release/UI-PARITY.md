# UI parity source of truth
The production public shell is now taken directly from `MPP_DESKTOP_ROUTED_PROTOTYPE_V2.html`, which itself preserves the approved `mpp_desktop_mockup.html` presentation and adds the approved routed/collapsible sidebar.

This corrects the previous v1/v2 mistake where the production frontend recreated the UI with generic panels instead of preserving the approved mockup.

Backend/API modules remain in `src/`. The previous generated production frontend is retained as `public/index.production-v2-backup.html` only for rollback/reference.
