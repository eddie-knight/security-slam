# Banner Maintenance Instructions

The site banner is a dismissible notification that appears at the top of every page. Users can permanently dismiss it by clicking the X button.

## Configuration Location

Edit the banner in: **`src/config/site.ts`**

Look for the `banner` section:

```typescript
banner: {
  enabled: true,
  message: "The Security Slam is now live! Slam Library assets are still being uploaded and may be incomplete at this time.",
  storageKey: "slam26-banner-dismissed"
}
```

## Common Tasks

### Disable the Banner

Set `enabled: false`:

```typescript
banner: {
  enabled: false,
  message: "...",
  storageKey: "..."
}
```

### Update the Message

Change the `message` field:

```typescript
banner: {
  enabled: true,
  message: "New message here!",
  storageKey: "slam26-banner-dismissed"
}
```

### Show Banner to Users Who Previously Dismissed It

Change the `storageKey` to a new unique value:

```typescript
banner: {
  enabled: true,
  message: "Important update!",
  storageKey: "slam26-banner-v2"  // Changed from "slam26-banner-dismissed"
}
```

**Note:** Changing the storage key resets the dismissal state for all users. They'll see the banner again even if they previously dismissed it.

## Technical Details

- **Component:** `src/components/Banner.tsx`
- **Storage:** Uses browser localStorage to remember dismissal
- **Styling:** Cyan background (`var(--gf-color-complement)`) with black text
- **Position:** Appears at the top of the page, above the header
- **Reopen Button:** A chevron-style dropdown arrow appears in the navbar when the banner is dismissed, allowing users to bring it back

## Best Practices

1. Keep messages concise - users typically scan banners quickly
2. Use the banner for temporary, time-sensitive announcements
3. Disable the banner when no longer needed rather than leaving it enabled indefinitely
4. Only change the storage key when you need to force the banner to reappear for all users
