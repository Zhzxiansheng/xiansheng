<template>
    <nav>
        <ul class="pagination">
            <li :class="{'disabled': current == 1}" @click="setCurrent(1)">
                <a href="javascript:;" class="left-left"></a>
            </li>
            <li :class="{'disabled': current == 1}" @click="setCurrent(current - 1)">
                <a href="javascript:;" class="left"></a>
            </li>
            <li
                v-for="(p,index) in grouplist"
                :class="{'active': current == p.val}"
                :key="index"
                @click="setCurrent(p.val)"
            >
                <a href="javascript:;">{{ p.text }}</a>
            </li>
            <li :class="{'disabled': current == page}" @click="setCurrent(current + 1)">
                <a href="javascript:;" class="right"></a>
            </li>
            <li :class="{'disabled': current == page}" @click="setCurrent(page)">
                <a href="javascript:;" class="right-right"></a>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            current: this.currentPage
        };
    },
    props: {
        total: Number, // 数据总条数
        display: { // 每页显示条数
            type: Number,
            default: 10
        },
        currentPage: {// 当前页码
            type: Number,
            default: 1
        },
        pagegroup: {// 分页条数
            type: Number,
            default: 3,
            coerce: function (v) {
                v = v > 0 ? v : 3;
                return v % 2 === 1 ? v : v + 1;
            }
        }
    },
    watch: {
        currentPage(value) {
            this.current = value;
        },
        total(value) {
            this.total = value;
        },
        display(value) {

        }
    },
    computed: {
        page: function () { // 总页数
            return Math.ceil(this.total / this.display);
        },
        grouplist: function () { // 获取分页页码
            var len = this.page;
            var temp = [];
            var list = [];
            var count = Math.floor(this.pagegroup / 2);
            var center = this.current;
            if (len <= this.pagegroup) {
                while (len--) {
                    temp.push( { text: this.page - len, val: this.page - len } );
                }
                return temp;
            }
            while (len--) {
                temp.push(this.page - len);
            }
            var idx = temp.indexOf(center);
            (idx < count) && ( center = center + count - idx);
            (this.current > this.page - count) && ( center = this.page - count);
            temp = temp.splice(center - count - 1, this.pagegroup);
            do {
                var t = temp.shift();
                list.push({
                    text: t,
                    val: t
                });
            } while (temp.length);
            if (this.page > this.pagegroup) {
                (this.current > count + 1) && list.unshift( { text: '...', val: list[0].val - 1 } );
                (this.current < this.page - count) && list.push( { text: '...', val: list[list.length - 1].val + 1 } );
            }
            return list;
        }
    },
    methods: {
        setCurrent: function (idx) {
            if (this.current != idx && idx > 0 && idx < this.page + 1) {
                this.current = idx;
                this.$emit('pagechange', this.current);
            }
        }
    }
};
</script>

<style lang="less" scoped>
.pagination {
    overflow: hidden;
    display: table;
    margin: 0 auto;
    /*width: 100%;*/
    height: 0.6rem;
    margin-top: 0.5rem;
    margin-bottom: 0.4rem;
  li {
    float: left;
    height: 0.6rem;
    border-radius: 5px;
    margin: 0.1rem;
    color: #666;
    list-style: none;
    width: 0.6rem;
    line-height: 0.6rem;
  &
  :hover {
    background: reba(0,0,0,0);
  }
  a {
    display: block;
    height: 100%;
    text-align: center;
    font-size: 0.24rem;
    border-radius: 5px;
    text-decoration: none;
    color: #666;
  }
  .left-left {
      background: url('../../../../asset/images/left-left.png') no-repeat;
      background-size: 100% 100%;
  }
  .left {
    background: url('../../../../asset/images/left.png') no-repeat;
    background-size: 100% 100%;
  }
  .right {
    background: url('../../../../asset/images/right.png') no-repeat;
    background-size: 100% 100%;
  }
  .right-right {
    background: url('../../../../asset/images/right-right.png') no-repeat;
    background-size: 100% 100%;
  }


  }
  .active {
    background: #FF4A57;
    color: #ffffff;

  a {
    color: #fff;
  }

  }
  }
  .disabled{
    a {
      color: #ccc !important;
    }
    .left-left {
      background: url('../../../../asset/images/disleft-left.png') no-repeat !important;
      background-size: 100% 100% !important;
    }
    .left {
      background: url('../../../../asset/images/disleft.png') no-repeat !important;
      background-size: 100% 100% !important;
    }
    .right {
      background: url('../../../../asset/images/disright.png') no-repeat !important;
      background-size: 100% 100% !important;
    }
    .right-right {
      background: url('../../../../asset/images/disright-right.png') no-repeat !important;
      background-size: 100% 100% !important;
    }
  }

</style>