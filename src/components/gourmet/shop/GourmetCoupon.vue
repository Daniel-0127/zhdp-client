<!--优惠券-->
<template>
  <div class="tickets">
    <div class="l-tickets">
      <div style="font-size: 77px;line-height:88px;display: inline;">{{price_}}</div>
      <div style="font-size: 29px;display: inline;">元</div>
      <div style="font-size: 16px;margin-top: -10px">全店{{limit_}}可用</div>
    </div>
    <div class="r-tickets">{{type_}}</div>
  </div>
</template>

<script>


export default {
  name: 'GourmetCoupon',
  props: { type_: String, price_: Number, limit_: String }
}
</script>

<style scoped>
.tickets {
  display: flex;
  /*padding: 20px;*/
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  color: #fff;
  text-align: center;
}

.l-tickets {
  width: 75%;
  position: relative;
  background: radial-gradient(circle at right top, transparent 16px, #ffc854 0, #FFB300 100%) right top / 100% 50% no-repeat,
  radial-gradient(circle at right bottom, transparent 16px, #ffc854 0, #FFB300 100%) right bottom / 100% 50% no-repeat;
  filter: drop-shadow(-3px 0 3px rgba(0, 0, 0, .3));
}

.l-tickets::after {
  content: '';
  position: absolute;
  height: 100%;
  width: 8px;
  top: 0;
  left: -8px;
  background: radial-gradient(circle at left center, transparent 8px, #FFB300 0) left center / 8px 20px;
}

.r-tickets {
  text-align: center;
  writing-mode: vertical-rl;
  font-size: 22px;
  padding-right: 13px;
  /*--*/
  flex: 1;
  position: relative;
  background: radial-gradient(circle at left top, transparent 16px, #ffc854 0, #ffcc61 100%) right top / 100% 50% no-repeat,
  radial-gradient(circle at left bottom, transparent 16px, #ffc854 0, #ffcc61 100%) right bottom / 100% 50% no-repeat;
  filter: drop-shadow(3px 0 3px rgba(0, 0, 0, .3));
}

.r-tickets::before {
  content: '';
  width: 1px;
  background: linear-gradient(to top, #fff 0%, #fff 50%, transparent 50%) top left / 1px 20px repeat-y;
  position: absolute;
  left: 0;
  top: 16px;
  bottom: 16px;
}

.r-tickets::after {
  content: '';
  position: absolute;
  height: 100%;
  width: 8px;
  top: 0;
  right: -8px;
  background: radial-gradient(circle at right center, transparent 8px, #ffcc61 0) right center / 8px 20px;
}
</style>
