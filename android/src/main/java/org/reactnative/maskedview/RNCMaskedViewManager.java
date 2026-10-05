package org.reactnative.maskedview;

import android.view.View;
import android.widget.Toast;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.views.view.ReactViewManager;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class RNCMaskedViewManager extends ViewGroupManager<RNCMaskedView> {
  private static final String REACT_CLASS = "RNCMaskedView";
  private final ReactViewManager mReactViewManager = new ReactViewManager();

  @Override
  public String getName() {
    return REACT_CLASS;
  }

  @Override
  protected RNCMaskedView createViewInstance(ThemedReactContext themedReactContext) {
    return new RNCMaskedView(themedReactContext);
  }

  @ReactProp(name = "pointerEvents")
  public void setPointerEvents(RNCMaskedView view, @Nullable String pointerEvents) {
    mReactViewManager.setPointerEvents(view, pointerEvents);
  }

  @ReactProp(name = "androidRenderingMode")
  public void setAndroidRenderingMode(RNCMaskedView view, @Nullable String renderingMode) {
    if (renderingMode != null) {
      view.setRenderingMode(renderingMode);
    }
  }
}
