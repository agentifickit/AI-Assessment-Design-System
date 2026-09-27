import React from 'react';
import { cn } from '../../utils/cn';

export interface DotFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  /** A violet spotlight of dots follows a mouse or pen over the field. */
  spotlight?: boolean;
}

/** The copilot column's dot field (DS-49): a faint grid of dots behind the
 *  thread, and a violet spotlight of the same grid under the pointer. Put
 *  text on `dot-knockout` so no glyph crosses a dot. The spotlight paints
 *  under every child, follows the pointer once a frame, and never rises for
 *  touch. For the working signal, place a `dot-field-live` patch inside. */
export const DotField = React.forwardRef<HTMLDivElement, DotFieldProps>(function DotField(
{ spotlight = true, className, children, onPointerMove, onPointerLeave, ...props },
ref)
{
  const local = React.useRef<HTMLDivElement | null>(null);
  const frame = React.useRef(0);

  React.useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const setRefs = (el: HTMLDivElement | null) => {
    local.current = el;
    if (typeof ref === 'function') ref(el);else
    if (ref) ref.current = el;
  };

  return (
    <div
      ref={setRefs}
      className={cn('dot-field', className)}
      onPointerMove={(e) => {
        onPointerMove?.(e);
        if (!spotlight || e.pointerType === 'touch') return;
        const { clientX, clientY } = e;
        cancelAnimationFrame(frame.current);
        frame.current = requestAnimationFrame(() => {
          const el = local.current;
          if (!el) return;
          const box = el.getBoundingClientRect();
          el.style.setProperty('--dot-x', `${clientX - box.left}px`);
          el.style.setProperty('--dot-y', `${clientY - box.top}px`);
          el.dataset.spot = 'on';
        });
      }}
      onPointerLeave={(e) => {
        onPointerLeave?.(e);
        cancelAnimationFrame(frame.current);
        if (local.current) delete local.current.dataset.spot;
      }}
      {...props}>

      {spotlight && <span className="dot-field-spot" aria-hidden="true" />}
      {children}
    </div>);

});
